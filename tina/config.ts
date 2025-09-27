import { defineConfig } from 'tinacms';

const branch =
  process.env.TINA_BRANCH ??
  process.env.VERCEL_GIT_COMMIT_REF ??
  process.env.GITHUB_HEAD_REF ??
  process.env.GITHUB_REF_NAME ??
  process.env.HEAD ??
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images/works',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'works',
        label: 'Works',
        path: 'src/data/works',
        format: 'md',
        ui: {
          filename: {
            slugify(values) {
              if (typeof values?.base === 'string') {
                const segments = values.base.split('/').filter(Boolean);
                return segments[segments.length - 1] || 'work';
              }
              return 'work';
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'base',
            label: 'Base image path',
            description:
              'Base path for the work assets, e.g. /images/works/my-project',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
          },
        ],
      },
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/data/pages',
        format: 'md',
        ui: {
          filename: {
            slugify(values) {
              if (typeof values?.name === 'string' && values.name.length > 0) {
                return values.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '')
                  .replace(/--+/g, '-');
              }
              return 'page';
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Page key',
            description: 'Logical page identifier, e.g. about_en or contacts',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
          },
        ],
      },
    ],
  },
});
