import { siteConfig } from '@/site.config';
export const getMenus = (textMap: any, locale: any) => {
  const target = locale === 'zh' ? '' : `/${locale}`;
  const hasAnimate = locale === 'en';
  const getHref = (str: any) => `${target}${str}`;
  const checkActive = (restr: any) => (path: any) =>
    new RegExp(`^${target.replace(/\//g, '\\/')}${restr}`).test(path);
  return [
    {
      label: textMap['all'],
      href: getHref('/'),
      isActive: (path: any) => ['/', ''].map(getHref).includes(path),
      hasAnimate,
      // icon: 'icon-[fa-solid--home]',
    },
    {
      label: textMap['works'],
      href: getHref('/works/'),
      isActive: checkActive('/works/?$'),
      hasAnimate,
      // icon: 'icon-[carbon--workspace]',
    },
    {
      label: textMap['about'],
      href: getHref('/about/'),
      isActive: checkActive('/about/?$'),
      hasAnimate,
      // icon: 'icon-[cib--about-me]',
    },
    {
      label: textMap['contact'],
      href: `mailto:${siteConfig.email}`,
      isActive: () => false,
      hasAnimate,
      // icon: 'icon-[mdi--contact-mail]',
    },
  ];
};
