const Generator = require('yeoman-generator');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all dotfiles
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationRoot()
    );
    // Copy all non-dotfiles
    // TODO: check whether this is the right way to use destinationRoot
    this.fs.copy(
      this.templatePath('**/*'),
      `${this.destinationRoot()}/src/`
    );
  };
  createPackageJson() {
    const packageJson = {
      name: 'tdd',
      description: 'A basic tdd project with typescript',
      scripts: {
        test: 'jest',
        "clear-jest": "jest --clearCache",
        lint: "tsc --noEmit && eslint './**'",
        "fix-lint": "eslint './**' --fix",
        postinstall: 'eslint --init && ts-jest config:init && tsc --init',
      },
      devDependencies: {
        eslint: '^6.8.0',
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
    this.yarnInstall();
  };
};

