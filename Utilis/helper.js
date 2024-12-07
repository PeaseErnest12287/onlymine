const chalk = require('chalk');

// Format logs with timestamps
function logWithTimestamp(message) {
    try {
        const timestamp = new Date().toISOString();
        console.log(chalk.blue(`[${timestamp}] ${message}`));
    } catch (error) {
        logError(`Error in logWithTimestamp: ${error.message}`);
    }
}

// Custom error logging
function logError(message) {
    try {
        const timestamp = new Date().toISOString();
        console.error(chalk.red(`[${timestamp}] ERROR: ${message}`));
    } catch (error) {
        console.error(chalk.red(`Error in logError: ${error.message}`));
    }
}

// Basic helper to check if a value is empty
function isEmpty(value) {
    try {
        return value === undefined || value === null || value === '';
    } catch (error) {
        logError(`Error in isEmpty: ${error.message}`);
        return true;  // return true if there's an error to prevent further issues
    }
}

// Helper function to format messages
function formatMessage(message, ...args) {
    try {
        return message.replace(/{}/g, () => args.shift());
    } catch (error) {
        logError(`Error in formatMessage: ${error.message}`);
        return '';  // return an empty string if there's an error
    }
}

module.exports = {
    logWithTimestamp,
    logError,
    isEmpty,
    formatMessage
};
