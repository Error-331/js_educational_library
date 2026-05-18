// external imports

// internal imports

// implementation
function formatPemKey(pemKey: string): string {
    return pemKey.replaceAll(/\\n/g, '\n');
}

// exports
export {
    formatPemKey,
}