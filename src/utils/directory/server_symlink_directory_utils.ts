// external imports
import { lstat, symlink, unlink, rm } from 'node:fs/promises';
import { resolve } from 'path';

// internal imports
import { checkFileExists } from '../file/server_file_utils';
import { isNullOrEmpty } from '../misc/logic_utils';

// implementation

/**
 * Creates a symbolic link from a target directory to a project path.
 */
async function createSymlinkToFile(targetFilePath: string, linkFilePath: string, force = false): Promise<void> {
    if (isNullOrEmpty(targetFilePath)) {
        throw new RangeError('Cannot create symlink to a file - target file path is not provided');
    }

    if (isNullOrEmpty(linkFilePath)) {
        throw new RangeError('Cannot create symlink to a file - link file path is not provided');
    }

    const targetFileAbsolutePath = resolve(targetFilePath);
    const linkFileAbsolutePath = resolve(linkFilePath);

    const [isTargetFileAbsolutePathExists, isLinkFileAbsolutePathExists] = await Promise.all([
        checkFileExists(targetFileAbsolutePath),
        checkFileExists(linkFileAbsolutePath),
    ]);

    if (!isTargetFileAbsolutePathExists) {
        throw new Error(`Cannot create symlink to a file - source target file does not exist at "${targetFileAbsolutePath}"`);
    }

    if (isLinkFileAbsolutePathExists) {
        const linkDirAbsoluteStats = await lstat(linkFileAbsolutePath);

        if (linkDirAbsoluteStats.isSymbolicLink()) {
            await unlink(linkFileAbsolutePath);
        } else if (force) {
            await rm(linkFileAbsolutePath, { recursive: true, force: true });
        } else {
            throw new Error(`Cannot create symlink to a file - path "${linkFileAbsolutePath}" already exists, use force to overwrite.`);
        }
    }

    await symlink(targetFileAbsolutePath, linkFileAbsolutePath, 'file');
}

/**
 * Creates a symbolic link from a target directory to a project path.
 */
async function createSymlinkToDirectory(targetDirPath: string, linkDirPath: string, force = false): Promise<void> {
    if (isNullOrEmpty(targetDirPath)) {
        throw new RangeError('Cannot create symlink to a directory - target directory path is not provided');
    }

    if (isNullOrEmpty(linkDirPath)) {
        throw new RangeError('Cannot create symlink to a directory - link directory path is not provided');
    }

    const targetDirAbsolutePath = resolve(targetDirPath);
    const linkDirAbsolutePath = resolve(linkDirPath);

    const [isTargetDirAbsolutePathExists, isLinkDirAbsolutePathExists] = await Promise.all([
        checkFileExists(targetDirAbsolutePath),
        checkFileExists(linkDirAbsolutePath),
    ]);

    if (!isTargetDirAbsolutePathExists) {
        throw new Error(`Cannot create symlink to a directory - source target directory does not exist at "${targetDirAbsolutePath}"`);
    }

    if (isLinkDirAbsolutePathExists) {
        const linkDirAbsoluteStats = await lstat(linkDirAbsolutePath);

        if (linkDirAbsoluteStats.isSymbolicLink()) {
            await unlink(linkDirAbsolutePath);
        } else if (force) {
            await rm(linkDirAbsolutePath, { recursive: true, force: true });
        } else {
            throw new Error(`Cannot create symlink to a directory - path "${linkDirAbsolutePath}" already exists, use force to overwrite.`);
        }
    }

    await symlink(targetDirAbsolutePath, linkDirAbsolutePath, 'dir');
}

/**
 * Safely removes a symbolic link if it exists.
 */
async function removeSymlinkFromDirectory(linkDirPath: string): Promise<void> {
    if (isNullOrEmpty(linkDirPath)) {
        throw new RangeError('Cannot remove symlink from a directory - link directory path is not provided');
    }

    const linkDirAbsolutePath = resolve(linkDirPath);
    const linkDirAbsoluteStats = await lstat(linkDirAbsolutePath);

    if (linkDirAbsoluteStats.isSymbolicLink()) {
        try {
            await unlink(linkDirAbsolutePath);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                throw new Error(`Cannot remove symlink from a directory - no symlink found at "${linkDirAbsolutePath}"`);
            } else {
                throw new Error(`Cannot remove symlink from a directory - internal error ("${error.code}")`);
            }
        }
    } else {
        throw Error(`Cannot remove symlink from a directory - "${linkDirAbsolutePath}" exists but it is a real file/directory, not a symlink`);
    }
}

// exports
export {
    createSymlinkToFile,
    createSymlinkToDirectory,

    removeSymlinkFromDirectory,
};