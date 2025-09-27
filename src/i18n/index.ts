import design from './design/en';

type TranslationNamespace = {
  design: typeof design;
};

const translations: TranslationNamespace = {
  design,
};

const interpolate = (template: string, params: Record<string, unknown>) =>
  template.replace(/{{\s*(.+?)\s*}}/g, (_, token: string) => {
    const key = token.trim();
    const value = params[key];
    return value === undefined || value === null ? '' : String(value);
  });

const resolveKey = (source: Record<string, any>, path: string) => {
  if (!path) return source;
  return path.split('.').reduce<any>((acc, part) => {
    if (acc && typeof acc === 'object') {
      return acc[part];
    }
    return undefined;
  }, source);
};

export const getI18n = async <T extends keyof TranslationNamespace>(
  _lang: string,
  namespace: T
) => {
  const dictionary = translations[namespace];

  return (key = '', options: Record<string, unknown> = {}) => {
    const value = resolveKey(dictionary as Record<string, any>, key);

    if (typeof value === 'string') {
      return interpolate(value, options);
    }

    return value;
  };
};
