"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stellar ${chalk.red("generator-marmot")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Project name: ",
        default: "marmot"
      },
      {
        type: "input",
        name: "version",
        message: "Project version: ",
        default: "0.0.1"
      },
      {
        type: "input",
        name: "description",
        message: "Project description: "
      },
      {
        type: "input",
        name: "author",
        message: "Author: "
      },
      {
        type: "input",
        name: "email",
        message: "Author Email: "
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let createDirName = "marmot";
    if (this.props.name) {
      createDirName = this.props.name;
    }

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(`${createDirName}/package.json`),
      {
        name: this.props.name,
        description: this.props.description,
        version: this.props.version,
        author: this.props.author,
        email: this.props.email
      }
    );
  }

  install() {
    this.installDependencies();
  }
};
