// Browsersync configuration that is used by lite-server for production server
module.exports = {
    // use a provided (through package.json scripts, etc.) port and IP if given, otherwise fall back
    port: process.env.PORT || '8080',
    host: process.env.IP || 'localhost',
    server: {
        baseDir: './dist',
        middleware: {
            // avoid the hash-bang in the browser address
            1: require('connect-history-api-fallback')({ index: '/index.html', verbose: true }),
            // serve up gzipped files
            2: require('compression')()
        }
    }
};
