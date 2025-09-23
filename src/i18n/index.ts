import path from 'path';
import i18next from 'i18next';

const modules = import.meta.glob('./design/*.js');

async function i18nInit() {
  const resources: Record<string, any> = {};
  for (const p in modules) {
    const mod = (await modules[p]()) as { default: any };
    const name = path.basename(p, '.js');
    resources[name] = {
      translation: {
        design: mod.default,
      },
    };
  }
  i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
}

export const getI18n = async (lang: string, name: string) => {
  await i18nInit();
  i18next.changeLanguage(lang || 'en');
  return (key = '', options = {}) => {
    if (typeof name === 'string') key = [name, key].filter(it => it).join('.');
    let ans: any = i18next.t(key, options);
    if (
      typeof ans === 'string' &&
      ans.includes('returned an object instead of strin')
    ) {
      ans = i18next.t(key, { ...options, returnObjects: true });
    }
    return ans;
  };
};
