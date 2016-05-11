"use strict";

const Base = require('yeoman-generator').Base;
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const GithubApi = require('github');

const github = new GithubApi({
    version: "3.0.0"
});

const QUESTIONS = [
    {
        type: 'input',
        name: 'module:name',
        message: 'Module Name (e.g, toggle-button-component)'
    },
    {   
        type: 'input',
        name: 'module:description',
        message: 'Module Description'
    },
    {
        type: 'input',
        name: 'github:user',
        message: 'GitHub Username'
    },
    {   
        type: 'confirm',
        name: 'repository:create',
        message: 'Create repository in GitHub?'
    }
];

module.exports = class AppGenerator extends Base {
    prompting() {
        const done = this.async();
 
        this.log(yosay('Welcome to the exciting npm module generator!'));
        
        this.prompt(QUESTIONS, answers => {
            this.answers = answers;

            const moduleName = answers['module:name'];
            const moduleDir = path.join(process.cwd(), moduleName);
            
            mkdirp(moduleName);
            process.chdir(moduleDir);

            this.log(chalk.bold.green(`Created a ${moduleName} directory for your module.`));

            done();
        });
    }

    writing() {
        this.directory('lib', 'lib');
        this.directory('test', 'test');
        this.directory('eslint', 'eslint');
        this.copy('.editorconfig', '.editorconfig');
        this.copy('.eslintignore', '.eslintignore');
        this.copy('.eslintrc.json', '.eslintrc.json');
        this.copy('.gitignore', '.gitignore');
        this.copy('package.json', 'package.json');
        this.copy('README.md', 'README.md');
        this.copy('index.js', 'index.js');        
    
        this.log(chalk.bold.green('Added files and folders to your module.'));
    }

    install() {
        this.log(chalk.bold.blue('running npm install'));

        this.npmInstall();
    }

    end() {
        const createRepo = this.answers['repository:create'];
        const githubUser = this.answers['github:user'];
        const repoName = this.answers['module:name'];
        const repoDescription = this.answers['module:description'];
        const repoUrl = `https://github.com/${githubUser}/${repoName}.git`
        const simpleGit = require('simple-git')('./');
        
        if (createRepo) {

            github.authenticate({
                type: 'oauth',
                token: process.env.GITHUB_ACCESS_TOKEN
            });

            github.repos.create({
                name: repoName,
                description: repoDescription

            }, (err, res) => {
                this.log(chalk.bold.green(`Github repo ${repoName} created for user ${githubUser}.`)); 

                simpleGit
                    .init()
                    .add('./*')
                    .commit('Initial commit')
                    .addRemote('origin', repoUrl)
                    .push('origin', 'master', (err, done) => {
                        this.log(chalk.bold.green(`Pushed changes to ${repoUrl}`));
                    });
            });
        }

        this.log(chalk.bold.green('Module created successfully'));
    }
};

