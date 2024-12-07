const fs = require('fs');
const path = require('path');
const got = require('got');
const { logError } = require('./helper');
const chalk = require('chalk');

// Helper function to download a file
async function downloadFile(url, dest) {
    try {
        const response = await got(url);
        if (response.statusCode === 200) {
            fs.writeFileSync(dest, response.body);
            console.log(chalk.green(`File downloaded successfully to ${dest}`));
        }
    } catch (error) {
        logError(`Error downloading file from ${url} to ${dest}: ${error.message}`);
    }
}

module.exports = {
    downloadFile
};
