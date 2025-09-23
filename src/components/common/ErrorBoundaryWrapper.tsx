import React from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export default function ErrorBoundaryWrapper({
  children,
  fallback,
  onError,
}: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}
