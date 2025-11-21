// external imports

// internal imports
import { isNil } from '../../utils/misc/logic_utils';

// implementation
class TikTokClientRegistry {
    private static instance: TikTokClientRegistry;

    private constructor() {}

    protected bindWindowEvents() {
        if (isNil(window.onTikTokAuthPopupResult)) {
            window.onTikTokAuthPopupResult = (result) => {
                console.log('tiktok result:', result);
            }
        }
    }

    public static getInstance(): TikTokClientRegistry {
        if (!TikTokClientRegistry.instance) {
            TikTokClientRegistry.instance = new TikTokClientRegistry();
        }

        return TikTokClientRegistry.instance;
    }

    public init(): void {
        this.bindWindowEvents();
    }
}

// exports
export default TikTokClientRegistry;