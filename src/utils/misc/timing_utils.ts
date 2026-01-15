// external imports
import { isNil } from './logic_utils';

// internal imports

// implementation
function debounce<UserFuncType extends (...args: unknown[]) => unknown>(usrFunc: UserFuncType, waitTime: number) {
    let timeoutCancel: number | null = null;

    return function() {
        if (!isNil(timeoutCancel)) {
            clearTimeout(timeoutCancel);
        }

        timeoutCancel = setTimeout(usrFunc, waitTime);
    }
}

function throttle<UserFuncType extends (...args: unknown[]) => unknown>(usrFunc: UserFuncType, waitTime: number, option = { leading: true, trailing: true }) {
    let waiting: boolean = false;
    let lastArgs: unknown[] = null;

    return (...args: unknown[]) => {
        if(!waiting) {
            waiting = true;

            const initWaiting = () => setTimeout(() => {
                if(option.trailing && lastArgs) {
                    usrFunc.apply(this, lastArgs);
                    lastArgs = null;

                    initWaiting();
                }
                else {
                    waiting = false;
                }
            }, waitTime);

            if(option.leading) {
                usrFunc.apply(this, args);
            } else {
                lastArgs = args;
            }

            initWaiting();
        }
        else {
            lastArgs = args;
        }
    }
}

// exports
export {
    debounce,
    throttle,
}