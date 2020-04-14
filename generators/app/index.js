const Generator = require('yeoman-generator');

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
  createPackageJson() {
    const packageJson = {
      name: 'tdd',
      description: 'A basic tdd project with typescript',
      scripts: {
        test: 'jest',
        postinstall: 'npx eslint --init && npx ts-jest config:init',
      },
      devDependencies: {
        '@types/jest': '^25.2.1',
        '@types/node': '^13.11.0',
        jest: '^25.2.7',
        'ts-jest': '^25.3.1',
        typescript: '^3.8.3'
      },
    };
    this.fs.extendJSON(this.destinationPath('package.json'), packageJson);
  };
};

module.exports = class extends MyBase {
  writing() {
    this.copyTemplateFiles();
    this.createPackageJson();
    this.config.save();
  };

  install() {
    this.npmInstall();
  };
};

