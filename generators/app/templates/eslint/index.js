module.exports = {
    extends: [
        './best-practices',
        './errors',
        './legacy',
        './node',
        './style',
        './variables'
    ].map(require.resolve),
    env: {
        browser: true,
        node: true,
        amd: true,
        mocha: false,
        jasmine: false
    },
    ecmaFeatures: {},
    globals: {},
    rules: {}
};