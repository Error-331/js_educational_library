// external imports
import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { mkdir as mkdirAsync } from 'fs/promises';

// internal imports
import { isNullOrEmpty } from './../misc/logic_utils'

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

/**
 * Creates all necessary subdirectories for the given directory path.
 * Uses Node.js fs.mkdir (async) with recursive option to create the full directory structure.
 *
 * @param directoryPath - The full path to the directory to create
 *
 * @throws RangeError if directory path is not provided
 *
 * @returns {Promise<void>} - A promise that resolves when the directory is created successfully
 */
async function ensureDirectoryExistsAsync(directoryPath: string): Promise<void> {
    if (isNullOrEmpty(directoryPath)) {
        throw new RangeError('Cannot ensure directory exists - provided directory path is not provided');
    }

    await mkdirAsync(directoryPath, { recursive: true });
}

// Example usage:
export {
    scanDirectoryRecursively,
    ensureDirectoryExistsAsync,
}