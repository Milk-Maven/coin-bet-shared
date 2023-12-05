
// copyScript.ts
import * as fs from 'fs-extra';
import * as path from 'path';

// Get the current script directory
const scriptDirectory = __dirname;

// Define the source folder path (the directory of the script)
const sourceFolderPath = path.join(scriptDirectory, 'shared');

// Define the destination paths
const destinationPath1 = '../frontend/src/lib/shared/';
const destinationPath2 = '../backend/shared/';

async function moveSharedFolderContents() {
  try {
    // Remove the contents of destinationPath1
    await fs.emptyDir(destinationPath1);

    // Remove the contents of destinationPath2
    await fs.emptyDir(destinationPath2);

    // Get a list of files and directories in the source folder
    const contents = await fs.readdir(sourceFolderPath);

    // Filter to include only TypeScript files (.ts)
    const tsFiles = contents.filter((item) => path.extname(item) === '.ts');

    // Move each TypeScript file to the first destination
    await Promise.all(
      tsFiles.map(async (item) => {
        console.log(item)
        const sourceItemPath = path.join(sourceFolderPath, item);
        const destinationItemPath1 = path.join(destinationPath1, item);
        await fs.copy(sourceItemPath, destinationItemPath1);
        console.log(`Moved ${item} to ${destinationPath1}`);
      })
    );

    // Move each TypeScript file to the second destination
    await Promise.all(
      tsFiles.map(async (item) => {
        const sourceItemPath = path.join(sourceFolderPath, item);
        const destinationItemPath2 = path.join(destinationPath2, item);
        await fs.copy(sourceItemPath, destinationItemPath2);
        console.log(`Moved ${item} to ${destinationPath2}`);
      })
    );
  } catch (error) {
    console.error('Error moving shared folder contents:', error);
  }
}

moveSharedFolderContents();
