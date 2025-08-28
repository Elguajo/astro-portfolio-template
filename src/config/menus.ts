import { siteConfig } from '@/site.config'
export const getMenus = (textMap, locale) => {
  const target = locale === 'zh' ? '' : `/${locale}`;
  const hasAnimate = locale === 'en';
  const getHref = (str) => `${target}${str}`;
  const checkActive = (restr) => (path) => (new RegExp(`^${target}${restr}`)).test(path)
  return [{
    label: textMap['all'],
    href: getHref('/'),
    isActive: (path) => ['/', ''].map(getHref).includes(path),
    hasAnimate,
    // icon: 'icon-[fa-solid--home]',
  }, {
    label: textMap['works'],
    href: getHref('/works/'),
    isActive: checkActive("\/works\/?$"),
    hasAnimate,
    // icon: 'icon-[carbon--workspace]',
  }, {
    label: textMap['about'],
    href: getHref('/about/'),
    isActive: checkActive("\/about\/?$"),
    hasAnimate,
    // icon: 'icon-[cib--about-me]',
  }, {
    label: textMap['contact'],
    href: `mailto:${siteConfig.email}`,
    isActive: (path) => false,
    hasAnimate,
    // icon: 'icon-[mdi--contact-mail]',
  }];
}
