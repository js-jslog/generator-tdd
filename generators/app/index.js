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
        'clear-jest': 'jest --clearCache',
        lint: 'tsc --noEmit && eslint \'./**\'',
        'fix-lint': 'eslint \'./**\' --fix',
      },
      devDependencies: {
        '@types/jest': '^25.2.1',
        '@types/node': '^13.11.0',
        '@typescript-eslint/parser': '^2.28.0',
        '@typescript-eslint/eslint-plugin': '^2.28.0',
        eslint: '^6.8.0',
        'eslint-config-airbnb-base': '^14.1.0',
        'eslint-plugin-import': '^2.20.2',
        'eslint-plugin-jest': '^23.8.2',
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

  end() {
    this.spawnCommand('npx', ['eslint', '--init']);
    this.spawnCommand('npx', ['ts-jest', 'config:init']);
    this.spawnCommand('npx', ['tsc', '--init']);
  };
};

