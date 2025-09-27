declare module 'tinacms/dist/admin' {
  import type { ComponentType } from 'react';

  type TinaConfig = Record<string, unknown>;

  export class LocalClient {
    constructor(options?: Record<string, unknown>);
  }

  export interface TinaAdminProps {
    config: TinaConfig;
    client?: unknown;
  }

  export const TinaAdmin: ComponentType<any>;
}
