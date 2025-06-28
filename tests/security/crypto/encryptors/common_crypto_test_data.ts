// external imports

// internal imports

// implementation
const textToEncrypt1 = 'Short text';
const textToEncrypt2 = 'This is a medium-length text for testing';
const textToEncrypt3 = 'This is a much longer string designed to test how the encryptor and decryptor handle larger strings without any issues. It includes numbers like 12345, special symbols like @$%!*, and more.';

const objectToEncrypt1 = {
    userId: Math.floor(Math.random() * 10000),
    name: "User" + Math.floor(Math.random() * 500),
    profile: {
        email: `user${Math.floor(Math.random() * 1000)}@mail.com`,
        preferences: {
            theme: Math.random() > 0.5 ? "dark" : "light",
            notifications: Math.random() > 0.5
        },
        activity: {
            lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
            isActive: Math.random() > 0.5
        }
    }
};

const objectToEncrypt2 = {
    orderId: Math.random().toString(36).substring(2, 8),
    items: Array.from({length: Math.floor(Math.random() * 3) + 1}, () => ({
        name: "Item" + Math.floor(Math.random() * 100),
        price: Number((Math.random() * 99.99).toFixed(2)),
        quantity: Math.floor(Math.random() * 5) + 1
    })),
    shipping: {
        address: {
            street: "Street" + Math.floor(Math.random() * 100),
            city: "City" + Math.floor(Math.random() * 50),
            postalCode: Math.floor(Math.random() * 90000) + 10000
        },
        method: Math.random() > 0.5 ? "standard" : "express",
        cost: Number((Math.random() * 20).toFixed(2))
    }
};

const objectToEncrypt3 = {
    sessionId: Math.random().toString(36).substring(2, 15),
    metadata: {
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + Math.floor(Math.random() * 10000000)).toISOString(),
        location: {
            country: "Country" + Math.floor(Math.random() * 100),
            coordinates: {
                latitude: (Math.random() * 180 - 90).toFixed(6),
                longitude: (Math.random() * 360 - 180).toFixed(6)
            }
        }
    },
    actions: Array.from({length: Math.floor(Math.random() * 4) + 1}, (_, index) => ({
        id: index + 1,
        type: Math.random() > 0.5 ? "click" : "navigate",
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000)).toISOString()
    }))
};
// exports
export {
    textToEncrypt1,
    textToEncrypt2,
    textToEncrypt3,

    objectToEncrypt1,
    objectToEncrypt2,
    objectToEncrypt3,
}