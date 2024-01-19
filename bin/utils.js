import fs from "fs";
import chalk from "chalk";

export const checkDir = (dir, name) => {
  let isExists = fs.existsSync(dir);
  if (isExists) {
    console.log(
      chalk.red(
        `The ${name} project already exists in  directory. Please try to use another projectName`
      )
    );
    process.exit(1);
  }
};

