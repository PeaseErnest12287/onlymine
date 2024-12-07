const chalk = require('chalk');
const { WAConnection } = require('@adiwajshing/baileys');
const { StringSession } = require('./whatsasena/');
const fs = require('fs');

async function whatsAsena() {
    const conn = new WAConnection();
    conn.version = [2, 2119, 6];
    const Session = new StringSession();
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 30000;

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Ernest')}
${chalk.white.italic('Ernest String Code Receiver')}

${chalk.blue.italic('ℹ️  Connecting to WhatsApp... Please wait.')}`);
    });

    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('Ernest String Code: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );

        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `ERNEST_SESSION="${st}"`);
        }

        console.log(
            chalk.blue.bold('If you are setting up locally, you can start the bot using node bot.js.')
        );

        // Send welcome message with session number
        const welcomeMessage = `
        👋 **Hello and welcome to Ernest!** 🎉

        Your session number is: **${st}**

        I'm here to help you with a variety of features to make your WhatsApp experience better:

        - 🚀 **Broadcast Messages**: Send messages to all group members easily.
        - 📚 **Automated Replies**: Set up automated responses for common questions.
        - 🔧 **Group Management**: Manage group settings and admin roles effortlessly.
        - 🏷️ **Tag Members**: Mention all group members in a single message.
        - 🌐 **Web Search**: Search the web directly from WhatsApp.

        **Guidelines:**
        - Be respectful and kind to everyone.
        - Please avoid spamming commands.

        For any help, type \`help\` or contact us at [support email or link].

        **Get Started:**
        Type \`start\` to begin exploring!

        🌐 **Follow us on social media for the latest updates:**
        - WhatsApp: [0793859108](https://wa.me/0793859108)
        - Instagram: [peaseernest](https://instagram.com/peaseernest)
        - Facebook: [Pease Ernest](https://facebook.com/peaseernest)

        Did you know? 🤔 
        *Octopuses have three hearts and blue blood!*

        Let's make your experience amazing!
        `;

        // Sending the welcome message to the console (or implement a function to send it to a user)
        console.log(welcomeMessage);

        process.exit(0);
    });

    await conn.connect();
}

whatsAsena();
