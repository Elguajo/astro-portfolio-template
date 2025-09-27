import { siteConfig } from '@/site.config';

export const getMenus = (textMap: Record<string, string>) => {
  const hasAnimate = true;
  const getHref = (str: string) => str;
  const checkActive = (restr: string) => (path: string) =>
    new RegExp(`^${restr}`).test(path);
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
