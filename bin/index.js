import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { checkDir } from './utils.js';
import { promptTypeList } from './config.js';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
const renameAsync = promisify(fs.rename);

const packageData = JSON.parse(fs.readFileSync('./package.json'));
const { name, description, version } = packageData;

const program = new Command();
program.name(name).description(description).version(version);

program
  .command('init <projectName>')
  .alias('i')
  .description('Enter the project name and initialize the project template')
  .action(async (projectName, cmd) => {
    checkDir(path.join(process.cwd(), projectName), projectName);
		const result = await inquirer.prompt(promptTypeList);
		const { url, gitName, val } = result.type;
		console.log('The template type information you selected is as follows：' + val);
		console.log('Project initialization copy acquisition...');
		if (!url) {
			console.log(chalk.red(`${val} This type is not supported at the moment...`));
			process.exit(1);
		}
		try {
			const { stdout, stderr } = await execAsync(`git clone ${url} ./${projectName}`)
		} catch (err) {
			console.log(chalk.red(`The ${val} project template failed to download`));
			await execAsync(`rm -rf ./${projectName}`)
			process.exit(1);
		}

		if (fs.existsSync(`./${projectName}/.git/config`)) {
			await execAsync('git remote rm origin', { cwd: `./${projectName}` });
			console.log(chalk.green(`✔ The ${projectName} project template successfully create`));
		}

  });
program.parse();
