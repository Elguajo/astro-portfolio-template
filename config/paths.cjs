const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  projectsDir: resolveApp('src/projects'),
  pagesDir: resolveApp('src/pages'),
  configLink: resolveApp('src/pages/_site.config.ts'),
};
