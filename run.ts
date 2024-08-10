// import { input, select } from "@inquirer/prompts";
// import { exec } from "child_process";
// import * as path from "path";
// import * as fs from "fs";
// import Choice from "inquirer/lib/objects/choice";
// import { Answers } from "inquirer";

// const baseDir = path.resolve(__dirname, "src");

// async function listFiles(
//   dir: string,
//   fileList: string[] = []
// ): Promise<string[]> {
//   const files = await fs.promises.readdir(dir);
//   for (const file of files) {
//     const filePath = path.join(dir, file);
//     const stat = await fs.promises.stat(filePath);
//     if (stat.isDirectory()) {
//       await listFiles(filePath, fileList);
//     } else if (file.endsWith(".ts")) {
//       fileList.push(filePath);
//     }
//   }
//   return fileList;
// }

// async function selectFile() {
//   const files = await listFiles(baseDir);
//   const choices = files.map((file) => path.relative(baseDir, file));

//   const mapChoices: Choice[] = choices.map((choice, index) => {
//     return new Choice(choice, files[index] as Answers);
//   });

//   const answer = await select({
//     message: "Select the TypeScript file you want to run:",
//     choices: mapChoices,
//   });

//   return path.join(baseDir, answer);
// }

// async function runFile(file: string) {
//   exec(`npx ts-node ${file}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`Stderr: ${stderr}`);
//       return;
//     }
//     console.log(stdout);
//   });
// }

// (async function () {
//   const file = await selectFile();
//   console.log(`Running ${file}...`);
//   await runFile(file);
// })();
