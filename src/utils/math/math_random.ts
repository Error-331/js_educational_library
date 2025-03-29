// external imports

// internal imports

// implementation
function generateRandomIdNumber(): number {
    return Math.floor((Math.random() * 999) + 1);
}

// exports
export {
    generateRandomIdNumber,
}