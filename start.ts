import { exec } from "child_process";
import { join } from "path";
import { cwd } from "process";
import { readdirSync, statSync } from "fs";

// Function to recursively search for a file in a directory
function findFileInDirectory(
  directory: string,
  fileName: string
): string | null {
  const items = readdirSync(directory);

  for (const item of items) {
    const fullPath = join(directory, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // Recursively search in subdirectories
      const result = findFileInDirectory(fullPath, fileName);
      if (result) return result;
    } else if (stats.isFile() && item === fileName) {
      // File found
      return fullPath;
    }
  }

  return null;
}

// Get the filename from command-line arguments or default to 'index.ts'
const fileName = process.argv[2] || "index.ts";
const filePath = findFileInDirectory(cwd(), fileName);

console.log(" Running file: ", filePath);

// Execute the ts-node command with the file path
exec(`ts-node ${filePath}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  } else {
    console.log(stdout);
    process.exit(0);
  }
});
