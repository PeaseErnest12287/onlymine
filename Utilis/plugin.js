const { logError } = require('../helper');
const chalk = require('chalk');
const fs = require('fs');
const got = require('got');

// Function to handle external plugin installation
async function installPlugin(plugin) {
    try {
        if (!fs.existsSync(`./plugins/${plugin.name}.js`)) {
            let response = await got(plugin.url);
            if (response.statusCode === 200) {
                fs.writeFileSync(`./plugins/${plugin.name}.js`, response.body);
                console.log(chalk.green(`Plugin ${plugin.name} installed successfully.`));
                require(`./plugins/${plugin.name}.js`);
            }
        }
    } catch (error) {
        logError(`Error installing plugin ${plugin.name}: ${error.message}`);
    }
}

module.exports = {
    installPlugin
};
