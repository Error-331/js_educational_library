// external imports

// internal imports

// implementation
const babelConfig =  {
    presets: [
        [
            '@babel/preset-env',
            { targets: { node: 'current' } }
        ],
        '@babel/preset-typescript',
    ],
};

// exports
module.exports = babelConfig;