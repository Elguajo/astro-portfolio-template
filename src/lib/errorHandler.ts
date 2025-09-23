/**
 * Global error handler for the application
 */

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent?: string;
  url?: string;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, AppError);
  }
}

export const errorCodes = {
  // Content errors
  CONTENT_NOT_FOUND: 'CONTENT_NOT_FOUND',
  INVALID_CONTENT_FORMAT: 'INVALID_CONTENT_FORMAT',
  
  // Image errors
  IMAGE_LOAD_FAILED: 'IMAGE_LOAD_FAILED',
  IMAGE_NOT_FOUND: 'IMAGE_NOT_FOUND',
  
  // Configuration errors
  CONFIG_MISSING: 'CONFIG_MISSING',
  INVALID_CONFIG: 'INVALID_CONFIG',
  
  // Build errors
  BUILD_FAILED: 'BUILD_FAILED',
  DEPLOYMENT_FAILED: 'DEPLOYMENT_FAILED',
} as const;

export function createError(
  message: string,
  code: keyof typeof errorCodes,
  statusCode: number = 500
): AppError {
  return new AppError(message, errorCodes[code], statusCode);
}

export function logError(error: Error | AppError, context?: Record<string, unknown>): void {
  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location?.href : undefined,
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('🚨 Application Error:', {
      ...errorInfo,
      context,
      isAppError: error instanceof AppError,
      code: error instanceof AppError ? error.code : undefined,
      statusCode: error instanceof AppError ? error.statusCode : undefined,
    });
  }

  // In production, you would send to error tracking service
  // Example: Sentry.captureException(error, { extra: context });
}

export function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  fallbackValue: T,
  errorMessage?: string
): Promise<T> {
  return asyncFn().catch((error) => {
    logError(error, { fallbackValue, errorMessage });
    return fallbackValue;
  });
}

export function handleSyncError<T>(
  syncFn: () => T,
  fallbackValue: T,
  errorMessage?: string
): T {
  try {
    return syncFn();
  } catch (error) {
    logError(error as Error, { fallbackValue, errorMessage });
    return fallbackValue;
  }
}
