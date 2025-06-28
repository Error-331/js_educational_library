// external imports
import { z } from 'zod';

// internal imports

// implementation
function validateRESTPage(page: unknown) {
   return z.coerce.number().min(1).safeParse(page);
}

function validateRESTLimit(limit: unknown) {
   return z.coerce.number().min(1).safeParse(limit);
}

// exports
export {
   validateRESTPage,
   validateRESTLimit,
}