// external imports
import { z } from 'zod';

// internal imports
const VALIDATION_SET_COOKIE_SAME_SITE_ZOD_ENUM = z.enum(['lax', 'strict', 'none']);
const VALIDATION_SET_COOKIE_PRIORITY_ZOD_ENUM = z.enum(['low', 'medium', 'high']);

// exports
export {
    VALIDATION_SET_COOKIE_SAME_SITE_ZOD_ENUM,
    VALIDATION_SET_COOKIE_PRIORITY_ZOD_ENUM,
}