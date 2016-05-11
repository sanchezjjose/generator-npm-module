# NPM Module Generator

Scaffolds an NPM Module that supports ES6, and uses eslint, istanbul and mocha.

## Getting started
Make sure you have [yeoman](https://github.com/yeoman/yo) installed, simply run anywhere:
```bash
sudo npm install -g yo
```

Install the generator:

You can not run this command with _sudo_. Open a new terminal tab and run this command anywhere: 
```bash
npm install -g generator-npm-module
```

## GitHub
This generator will also create a GitHub repository for you if you desire. For this to work, you will need to generate an GitHub access token and set it to your environment variables before running this generator.

- Go to your github settings
- Click the ```Personal access tokens``` preference
- Click ```Generate new token```
- Select the ```repo > public_repo``` option
- Copy the generated access token and add it to your environment variables

Read more here: https://developer.github.com/v3/repos/#create

## Updating the generator
```bash
yo
```

Select Update

## Usage

Run the generator:
```bash
yo npm-module 
```
Answer a few questions and code away!

## Local Development

On the command line, from the root of your generator project (in the generator-npm-module/ folder), type:
```bash
npm link
```
That will install your project dependencies and symlink a global module to your local file. After npm is done, you'll be able to call `yo npm-module` to run the generator.

