const Generator = require('yeoman-generator');
const DotfilesGenerator = require('/home/developer/yeoman-generators/generator-dotfiles/generators/app/index.js');

const MyBase = class extends Generator {
  copyTemplateFiles() {
    // Copy all non-dotfiles
    this.fs.copy(
      // If dotfiles are reintroduced
      // the repeat this with '.*'
      this.templatePath('**/*'),
      this.destinationRoot()
    );
  };
};

module.exports = class extends MyBase {
  initializing() {
    this.composeWith({
      Generator: DotfilesGenerator,
      path: require.resolve('/home/developer/yeoman-generators/generator-dotfiles/generators/app')
    });
  };

  writing() {
    this.copyTemplateFiles();
    this.config.save();
  };

  install() {
    this.npmInstall();
  };
};

