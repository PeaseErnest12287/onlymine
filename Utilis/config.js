const { logError } = require('./Utilis/helper');
const chalk = require('chalk');

// Example configuration setup
const config = {
    SESSION: process.env.SESSION || '',
    VERSION: '1.0.0',
    DEBUG: process.env.DEBUG === 'true',
    CLR_SESSION: false,
    DATABASE: {
        sync: async function () {
            try {
                // Simulate database sync logic
                console.log(chalk.green('Database synchronized.'));
            } catch (error) {
                logError(`Error syncing database: ${error.message}`);
            }
        }
    }
};

module.exports = config;
