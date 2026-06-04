// external imports

// internal imports
import { generateRandomIntInRange } from './math_random';

// implementation

/**
 * Generates a random seed for Stable Diffusion.
 * Range: 0 to 4,294,967,295 (32-bit unsigned integer).
 *
 * @returns {number} A valid 32-bit random integer seed.
 *
 */
function generateRandomStableDiffusionSeed(): number {
    return generateRandomIntInRange(0, 4294967296);
}

/**
 * Generates a random seed for the FLUX model.
 * Range: 0 to 4,294,967,295 (32-bit unsigned integer).
 *
 * @returns {number} A valid 32-bit random integer seed.
 *
 */
// TODO: replace to this 18446744073709551615
function generateRandomFluxSeed(): number {
    return generateRandomIntInRange(0, 2147483647);
}

// exports
export {
    generateRandomStableDiffusionSeed,
    generateRandomFluxSeed,
}