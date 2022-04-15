const PROXY_CONFIG = {
    "http://localhost:4200": {
        "target": "http://localhost:3000",
        "changeOrigin": true,
        "secure": false,
        "logLevel": "debug",
    }
};
module.exports = PROXY_CONFIG;
