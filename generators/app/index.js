
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')
const pkgJson = require('../../package.json')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stellar ${chalk.red('generator-marmot')} generator!`
      )
    )

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name: ',
        default: 'marmot'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version: ',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description: '
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author: '
      },
      {
        type: 'input',
        name: 'email',
        message: 'Author Email: '
      },
      {
        name: 'style',
        type: 'confirm',
        message: 'Add eslint and commitlint to this project?',
        default: true
      },
      {
        name: 'standardVersion',
        type: 'confirm',
        message: 'Add standard-version to this project?',
        default: true
      }
    ]

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    let createDirName = 'marmot'
    if (this.props.name) {
      createDirName = this.props.name
    }

    const pkg = {
      name: this.props.name,
      version: this.props.version,
      description: this.props.description,
      author: {
        name: this.props.author,
        email: this.props.email
      },
      main: 'index.js',
      keywords: [],
      devDependencies: {},
      engines: {
        npm: '>= 10.0.0'
      }
    }

    if (this.props.style) {
      this.fs.copy(
        this.templatePath('.eslintrc.js'),
        this.destinationPath(`${createDirName}/.eslintrc.js`)
      )
      this.fs.copy(
        this.templatePath('.lintstagedrc.js'),
        this.destinationPath(`${createDirName}/.lintstagedrc.js`)
      )
      this.fs.copy(
        this.templatePath('.commitlintrc.js'),
        this.destinationPath(`${createDirName}/.commitlintrc.js`)
      )
      this.fs.copy(
        this.templatePath('.huskyrc.js'),
        this.destinationPath(`${createDirName}/.huskyrc.js`)
      )
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath(`${createDirName}/.gitignore`)
      )
      const devDependencies = _.pick(pkgJson.devDependencies, ['@commitlint/cli', '@commitlint/config-conventional', 'eslint', 'eslint-config-airbnb-standard', 'husky', 'lint-staged'])
      pkg.devDependencies = Object.assign(pkg.devDependencies, devDependencies)
    }

    if (this.props.standardVersion) {
      this.fs.copy(
        this.templatePath('Makefile'),
        this.destinationPath(`${createDirName}/Makefile`)
      )
      const devDependencies = _.pick(pkgJson.devDependencies, ['standard-version'])
      pkg.devDependencies = Object.assign(pkg.devDependencies, devDependencies)
    }

    this.fs.writeJSON(this.destinationPath(`${createDirName}/package.json`), pkg)
  }

  // install() {
  //   this.installDependencies();
  // }
}
