// external imports

// internal imports

// implementation
function formattedISODateNow(): string {
    const currentDate = new Date();
    const isoString = currentDate.toISOString();

    return isoString.split('T')[0];
}

// exports
export {
    formattedISODateNow,
}