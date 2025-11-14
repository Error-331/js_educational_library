// external imports
import { join } from 'node:path';
import { readdirSync } from 'node:fs';

// internal imports

// implementation

/**
 * Recursively scans a directory and returns a list of all files with their absolute paths.
 *
 * @param {string} dirPath - The absolute path to the directory to scan.
 *
 * @returns {string[]} - Array containing absolute paths of all files found.
 *
 */
function scanDirectoryRecursively(dirPath: string) {
    const fileList: string[] = [];

    const scan = (subDirPath: string) => {
        const entries = readdirSync(subDirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(subDirPath, entry.name);

            if (entry.isDirectory()) {
                scan(fullPath); // Recursively scan subdirectories
            } else if (entry.isFile()) {
                fileList.push(fullPath); // Add the file
            }
        }
    }

    scan(dirPath);
    return fileList;
}

// Example usage:
export {
    scanDirectoryRecursively,
}