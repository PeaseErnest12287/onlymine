console.log('Starting bot.js');

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { DataTypes } = require('sequelize');
const config = require('./config');
const { WAConnection, MessageType } = require('@adiwajshing/baileys');

// Simplified imports
let handleMessages, StringSession;
try {
  handleMessages = require('./Utilis/msg').handleMessages;
  console.log('Loaded ./Utilis/msg successfully');
} catch (err) {
  console.error('Error loading module: ./Utilis/msg', err);
}

try {
  StringSession = require('./Utilis/whatsasena').StringSession;
  console.log('Loaded ./Utilis/whatsasena successfully');
} catch (err) {
  console.error('Error loading module: ./Utilis/whatsasena', err);
}

// Core functionality
const got = require('got');

const WhatsAsenaDB = config.DATABASE.define('WhatsAsena', {
  info: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] !== 'undefined' ? args[i++] : '';
  });
};

if (!Date.now) {
  Date.now = function () {
    return new Date().getTime();
  };
}

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

async function whatsAsena(version) {
  await config.DATABASE.sync();
  let StrSes_Db = await WhatsAsenaDB.findAll({
    where: { info: 'StringSession' },
  });
  const conn = new WAConnection();
  conn.version = version;
  const Session = new StringSession();
  conn.logger.level = config.DEBUG ? 'debug' : 'warn';
  var nodb;

  if (StrSes_Db.length < 1 || config.CLR_SESSION) {
    nodb = true;
    conn.loadAuthInfo(Session.deCrypt(config.SESSION));
  } else {
    conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
  }

  conn.on('connecting', () => {
    console.log(`${chalk.red.bgBlack('B')}${chalk.green.bgBlack('o')}${chalk.blue.bgBlack('t')}${chalk.yellow.bgBlack('t')}${chalk.white.bgBlack('u')}${chalk.magenta.bgBlack('s')}
    ${chalk.white.bold.bgBlack('Version:')} ${chalk.red.bold.bgBlack(config.VERSION)}
    ${chalk.blue.italic.bgBlack('ℹ️ Connecting to WhatsApp... Please wait.')}`);
  });

  conn.on('open', async () => {
    console.log(chalk.green.bold('✅ Login successful!'));
    console.log(chalk.blueBright.italic('⬇️ Installing external plugins...'));
    console.log(chalk.blueBright.italic('✅ Login information updated!'));

    const authInfo = conn.base64EncodedAuthInfo();
    if (StrSes_Db.length < 1) {
      await WhatsAsenaDB.create({
        info: 'StringSession',
        value: Session.createStringSession(authInfo),
      });
    } else {
      await StrSes_Db[0].update({
        value: Session.createStringSession(authInfo),
      });
    }

    console.log(chalk.green.bold('✅ Plugins installed!'));
    await conn.sendMessage(
      conn.user.jid,
      'Welcome to WhatsAsena!',
      MessageType.text,
      { detectLinks: false }
    );
  });
  conn.on('close', (e) => console.log(e.reason));

  conn.on('chat-update', (m) => {
    if (!m.hasNewMessage) return;
    if (!m.messages && !m.count) return;
    const { messages } = m;
    const all = messages.all();
    handleMessages(all[0], conn);
  });

  try {
    await conn.connect();
  } catch (e) {
    if (!nodb) {
      console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'));
      conn.loadAuthInfo(Session.deCrypt(config.SESSION));
      try {
        await conn.connect();
      } catch (e) {
        return;
      }
    } else {
      console.log(`${e.message}`);
    }
  }
}

(async () => {
  whatsAsena('2.2142.12');
})();
