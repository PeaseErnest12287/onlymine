// lydia.js - Updated for keyword-based responses

let lydiaState = {};  // In-memory object to track Lydia's state for each chat

// Function to activate Lydia for a chat
const setLydia = (jid, state) => {
  lydiaState[jid] = state;  // Store the state (true/false) for the specific chat
};

// Function to get Lydia's state for a chat
const getLydia = (jid) => {
  return lydiaState[jid] || false;  // Return false if no state is stored for the chat
};

// Predefined responses for specific messages
const keywordResponses = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! What can I do for you?",
  "how are you": "I'm just a bot, but I'm doing great! How about you?",
  "bye": "Goodbye! Have a great day!",
  "help": "Sure! What do you need assistance with?",
  "thanks": "You're welcome! Let me know if you need anything else!",
  "sorry": "No worries! How can I assist you?",
  "what's your name": "I'm Lydia, your assistant!",
  // Add more keywords and responses as needed
};

// Function to handle incoming messages and respond based on keywords
const lydia = async (message) => {
  const jid = message.jid;  // Get the chat's unique identifier
  const state = getLydia(jid);  // Check if Lydia is active in the chat

  // If Lydia is active, check the message for keywords and respond accordingly
  if (state) {
    const messageText = message.text.toLowerCase();  // Convert the message to lowercase

    // Loop through the keyword responses
    for (let keyword in keywordResponses) {
      // If the message contains the keyword, send the corresponding response
      if (messageText.includes(keyword)) {
        await message.sendMessage(keywordResponses[keyword], { quoted: message.data });
        return;
      }
    }

    // If no keywords are found, send a default response
    await message.sendMessage("Sorry, I didn't understand that. Can you ask something else?", { quoted: message.data });
  }
};

// Example of activating and deactivating Lydia
const activateLydia = (jid) => {
  setLydia(jid, true);  // Activate Lydia for this chat
  console.log(`Lydia activated for chat: ${jid}`);
};

const deactivateLydia = (jid) => {
  setLydia(jid, false);  // Deactivate Lydia for this chat
  console.log(`Lydia deactivated for chat: ${jid}`);
};
