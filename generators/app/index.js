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
      description: 'A basic tdd project with typescript',
      scripts: {
        test: 'jest'
      },
      devDependencies: {
        '@types/jest': '^25.2.1',
        '@types/node': '^13.11.0',
        jest: '^25.2.7',
        'ts-jest': '^25.3.1',
        typescript: '^3.8.3'
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

