// external imports
import path from 'node:path';
import { execSync } from 'node:child_process';

// internal imports
import { isNullOrEmpty } from '../misc/logic_utils';

// implementation
function createGlobalLinksForNPMPackages(npmPackages: { [key: string]: string }[]): void {
    if (isNullOrEmpty(npmPackages)) {
        throw new RangeError('Cannot create global links for NPM package - NPM packages are not provided');
    }

    for (const npmPackage of npmPackages) {
        const [npmPackageName, npmPackageSourcePath] = Object.entries(npmPackage)[0];
        const npmPackageAbsoluteSourcePath = path.resolve(npmPackageSourcePath);

        execSync('npm link --legacy-peer-deps', {cwd: npmPackageAbsoluteSourcePath, stdio: 'inherit'});
    }
}

function linkNPMPackages(npmPackages: { [key: string]: string }[], projectDir = process.cwd()): void {
    if (isNullOrEmpty(npmPackages)) {
        throw new RangeError('Cannot link NPM packages - NPM packages are not provided');
    }

    const combinedNPMPackagesNames: string[] = [];

    for (const npmPackage of npmPackages) {
        const [npmPackageName] = Object.entries(npmPackage)[0];
        combinedNPMPackagesNames.push(npmPackageName);
    }

    execSync(`npm link ${combinedNPMPackagesNames.join(' ')} --legacy-peer-deps`, { cwd: projectDir, stdio: 'inherit' });
}

function unlinkNPMPackages(npmPackages: { [key: string]: string }[], projectDir: string = process.cwd()) {
    if (isNullOrEmpty(npmPackages)) {
        throw new RangeError('Cannot unlink NPM packages - NPM packages are not provided');
    }

    const combinedNPMPackagesNames: string[] = [];

    for (const npmPackage of npmPackages) {
        const [npmPackageName] = Object.entries(npmPackage)[0];
        combinedNPMPackagesNames.push(npmPackageName);
    }

    execSync(`npm unlink ${combinedNPMPackagesNames.join(' ')} --legacy-peer-deps`, { cwd: projectDir, stdio: 'inherit' });
}

function createGlobalNPMLinksAndLinkToProject(npmPackages: { [key: string]: string }[], projectDir: string = process.cwd()): void {
    createGlobalLinksForNPMPackages(npmPackages);
    linkNPMPackages(npmPackages, projectDir);
}

// exports
export {
    createGlobalLinksForNPMPackages,
    linkNPMPackages,
    unlinkNPMPackages,
    createGlobalNPMLinksAndLinkToProject,
}