// external imports

// internal imports

// implementation
function asyncDelay(delay = 0) {
    return new Promise((resolve) => {
       setTimeout(resolve, delay);
    });
}

// exports
export {
    asyncDelay,
}