declare module '@hdud/common/libs/robot' {
  // eslint-disable-next-line no-unused-vars
  export type RobotTxtFactory = (site: URL | undefined) => string;

  export default function getRobotTxt(
    // eslint-disable-next-line no-unused-vars
    options?: Record<string, unknown>
  ): Promise<RobotTxtFactory>;
}

declare module '@hdud/common/components/Footer.astro' {
  const Footer: any;
  export default Footer;
}

declare module '@hdud/common/layouts/BaseLayout.astro' {
  const BaseLayout: any;
  export default BaseLayout;
}
