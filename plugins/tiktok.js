/* Copyright (C) 2024 Pease Ernest.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Pease Ernest.
*/
const Asena = require("../Utilis/events")
const { MessageType } = require("@adiwajshing/baileys")
const { getJson, TiktokDownloader, getBuffer } = require("../Utilis/download")
const { UploadToImgur, parsedJid, getOneWallpaper } = require("../Utilis/Misc")
const Language = require("../language")
const Lang = Language.getString("tiktok")
const { forwardOrBroadCast } = require("../Utilis/groupmute")

Asena.addCommand(
  { pattern: "tiktok ?(.*)", fromMe: true, desc: Lang.TIKTOK_DESC },
  async (message, match) => {
    match = match || message.reply_message.text
    if (match == "")
      return await message.sendMessage(Lang.NEED_REPLY, {
        quoted: message.data,
      })
    const link = await TiktokDownloader(match)
    if (!link)
      return await message.sendMessage(Lang.INVALID, {
        quoted: message.data,
      })
    const { buffer } = await getBuffer(link)
    return await message.sendMessage(
      buffer,
      { quoted: message.quoted },
      MessageType.video
    )
  }
)

Asena.addCommand(
  { pattern: "movie ?(.*)", fromMe: true, desc: Lang.MOVIE_DESC },
  async (message, match) => {
    if (match === "")
      return await message.sendMessage(Lang.NEED_NAME, {
        quoted: message.data,
      });

    // Fetch movie details from OMDb API
    let urlOmdb = `http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`;
    const jsonOmdb = await getJson(urlOmdb);

    if (jsonOmdb.Response != "True")
      return await message.sendMessage(Lang.NOT_FOUND, {
        quoted: message.data,
      });

    // Fetch movie details from another API (example: your provided new API)
    let urlNewApi = `http://www.omdbapi.com/?i=tt3896198&apikey=cd6f17e4`;  // Replace with your second API URL
    const jsonNewApi = await getJson(urlNewApi);

    if (jsonNewApi.Response != "True")
      return await message.sendMessage(Lang.NOT_FOUND, {
        quoted: message.data,
      });

    // Combine the information from both APIs
    let msg = "Movie Information from OMDb API:\n";
    msg += "```Title      : " + jsonOmdb.Title + "\n\n";
    msg += "Year       : " + jsonOmdb.Year + "\n\n";
    msg += "Rated      : " + jsonOmdb.Rated + "\n\n";
    msg += "Released   : " + jsonOmdb.Released + "\n\n";
    msg += "Runtime    : " + jsonOmdb.Runtime + "\n\n";
    msg += "Genre      : " + jsonOmdb.Genre + "\n\n";
    msg += "Director   : " + jsonOmdb.Director + "\n\n";
    msg += "Writer     : " + jsonOmdb.Writer + "\n\n";
    msg += "Actors     : " + jsonOmdb.Actors + "\n\n";
    msg += "Plot       : " + jsonOmdb.Plot + "\n\n";
    msg += "Language   : " + jsonOmdb.Language + "\n\n";
    msg += "Country    : " + jsonOmdb.Country + "\n\n";
    msg += "Awards     : " + jsonOmdb.Awards + "\n\n";
    msg += "BoxOffice  : " + jsonOmdb.BoxOffice + "\n\n";
    msg += "Production : " + jsonOmdb.Production + "\n\n";
    msg += "imdbRating : " + jsonOmdb.imdbRating + "\n\n";
    msg += "imdbVotes  : " + jsonOmdb.imdbVotes + "```";

    // Append information from the second API
    msg += "\n\nMovie Information from Second API:\n";
    msg += "```Title      : " + jsonNewApi.Title + "\n\n";
    msg += "Year       : " + jsonNewApi.Year + "\n\n";
    msg += "Rated      : " + jsonNewApi.Rated + "\n\n";
    msg += "Released   : " + jsonNewApi.Released + "\n\n";
    msg += "Runtime    : " + jsonNewApi.Runtime + "\n\n";
    msg += "Genre      : " + jsonNewApi.Genre + "\n\n";
    msg += "Director   : " + jsonNewApi.Director + "\n\n";
    msg += "Writer     : " + jsonNewApi.Writer + "\n\n";
    msg += "Actors     : " + jsonNewApi.Actors + "\n\n";
    msg += "Plot       : " + jsonNewApi.Plot + "\n\n";
    msg += "Language   : " + jsonNewApi.Language + "\n\n";
    msg += "Country    : " + jsonNewApi.Country + "\n\n";
    msg += "Awards     : " + jsonNewApi.Awards + "\n\n";
    msg += "BoxOffice  : " + jsonNewApi.BoxOffice + "\n\n";
    msg += "Production : " + jsonNewApi.Production + "\n\n";
    msg += "imdbRating : " + jsonNewApi.imdbRating + "\n\n";
    msg += "imdbVotes  : " + jsonNewApi.imdbVotes + "```";

    // Send combined movie details
    return await message.sendMessage(msg);
  }
);

Asena.addCommand(
  { pattern: "forward ?(.*)", fromMe: true, desc: Lang.FORWARD_DESC },
  async (message, match) => {
    if (match == "") return await message.sendMessage(Lang.JID)
    if (!message.reply_message) return await message.sendMessage(Lang.FORWARD)
    for (let jid of parsedJid(match)) {
      await forwardOrBroadCast(jid, message)
    }
  }
)
Asena.addCommand(
  {
    pattern: "wallpaper ?(.*)",
    fromMe: true,
    desc: Lang.WALLPAPER_DESC,
  },
  async (message, match) => {
    if (match == "") return message.sendMessage(Lang.NEED_NAME)
    const buffer = await getOneWallpaper(match, message)
    if (!buffer) return await message.sendMessage(Lang.NOT_FOUND)
    return await message.sendMessage(
      buffer,
      { quoted: message.data },
      MessageType.buttonsMessage
    )
  }
)

Asena.addCommand(
  { pattern: "url", fromMe: true, desc: Lang.URL_DESC },
  async (message, match) => {
    if (
      !message.reply_message ||
      (!message.reply_message.image && !message.reply_message.video)
    )
      return await message.sendMessage(Lang.URL_NEED_REPLY)
    if (message.reply_message.video && message.reply_message.seconds > 60)
      return await message.sendMessage("*Only accept below 1min*")
    return await message.sendMessage(
      await UploadToImgur(
        await message.reply_message.downloadAndSaveMediaMessage("url")
      ),
      { quoted: message.data }
    )
  }
)
