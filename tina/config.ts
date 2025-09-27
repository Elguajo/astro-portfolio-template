import { defineConfig } from 'tinacms';

const branch =
  process.env.TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.GITHUB_HEAD_REF ||
  process.env.GITHUB_REF_NAME ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
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
    ],
  },
});
