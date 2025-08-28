import path from 'path';
import i18next from 'i18next';

const modules = import.meta.glob('./design/*.js');

async function i18nInit() {
  const resources = {};
  for (const p in modules) {
    const mod = await modules[p]();
    const name = path.basename(p, '.js')
    resources[name] = {
      translation: {
        design: mod.default
      }
    }
  }
  i18next.init({
    lng: 'zh',
    fallbackLng: 'zh',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
};


export const getI18n = async (lang, name) => {
  await i18nInit()
  i18next.changeLanguage(lang || 'zh')
  return (key = '', options = {}) => {
    if (typeof name === 'string') key = [name, key].filter(it => it).join('.');
    let ans = i18next.t(key, options);
    if (ans.includes('returned an object instead of strin')) {
      ans = i18next.t(key, { ...options, returnObjects: true });
    }
    return ans;
  }
};

