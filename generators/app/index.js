const Generator = require('yeoman-generator');
const DotfilesGenerator = require.resolve('generator-dotfiles/generators/app');
const augmentPackageJson = require('generator-dotfiles/utilities/augmentPackageJson');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all non-dotfiles
    this.fs.copy(
      // If dotfiles are reintroduced
      // then repeat this section with '.*'
      this.templatePath('**/*'),
      this.destinationRoot()
    );
  };
  decoratePackageJsonBeforeInstall() {
    const packageJsonAugmentation = {
      name: 'tdd',
      description: 'A basic tdd project',
      scripts: {
        test: 'jest'
      },
      devDependencies: {
        '@babel/core': '^7.9.0',
        '@babel/preset-env': '^7.9.0',
        '@babel/preset-typescript': '^7.9.0',
        'babel-jest': '^25.2.6',
        jest: '^24.7.1',
        typescript: "^3.8.3"
      },
    };
    augmentPackageJson(packageJsonAugmentation, this.destinationPath('package.json'));
  };
};

module.exports = class extends MyBase {
  initializing() {
    this.composeWith(DotfilesGenerator);
  };

  writing() {
    this.copyTemplateFiles();
    this.config.save();
  };

  install() {
    this.decoratePackageJsonBeforeInstall();
    this.npmInstall();
  };
};

