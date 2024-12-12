const { logError, logWithTimestamp } = require('./helper');  // Helper functions for logging
const chalk = require('chalk');  // For colorful console output
const { conn } = require('./conn');  // Assuming 'conn' is your connection manager for WhatsApp, this should be properly imported or passed
const { getMessageFromUser } = require('./msg');  // Assuming this is a function that listens for user messages or responses

let storyGame = {
    active: false,
    players: [],
    story: [],
    timer: null,
    joinTimeout: null,
    storyStarts: [
        "Once upon a time...",
        "In a land far away...",
        "Long ago, in a kingdom by the sea...",
        "In a mysterious forest...",
        "On a stormy night..."
    ]
};

// Start the story game
async function startStoryGame(message) {
    if (storyGame.active) {
        conn.sendMessage(message.chat, "The game is already active!", { quoted: message });
        return;
    }

    storyGame.active = true;
    storyGame.players = [];
    storyGame.story = [];

    // Select a random story start
    const randomStart = storyGame.storyStarts[Math.floor(Math.random() * storyGame.storyStarts.length)];
    storyGame.story.push(randomStart);

    // Prompt users to join
    conn.sendMessage(message.chat, `Type .join to join the story-building game! You have 30 seconds to join.`, { quoted: message });

    // Allow 30 seconds for players to join
    storyGame.joinTimeout = setTimeout(() => {
        if (storyGame.players.length < 3) {
            const playersNeeded = 3 - storyGame.players.length;
            conn.sendMessage(message.chat, `The game couldn't start. You need at least 3 players to start. ${playersNeeded} more players needed.`, { quoted: message });
            storyGame.active = false;
        } else {
            // Start the game if enough players joined
            startStoryWriting(message);
        }
    }, 30000); // 30 seconds to join
}

// Handle joining the game
async function joinStoryGame(message) {
    if (!storyGame.active) {
        conn.sendMessage(message.chat, "There's no active story-building game right now.", { quoted: message });
        return;
    }

    if (storyGame.players.includes(message.sender)) {
        conn.sendMessage(message.chat, "You are already in the game!", { quoted: message });
        return;
    }

    storyGame.players.push(message.sender);
    conn.sendMessage(message.chat, `You have joined the game! Total players: ${storyGame.players.length}`, { quoted: message });
}

// Start the story writing after players have joined
async function startStoryWriting(message) {
    conn.sendMessage(message.chat, "The game is starting! Each player has 15 seconds to contribute a sentence.", { quoted: message });

    let currentPlayerIndex = 0;
    let writingTimeout = setInterval(async () => {
        const currentPlayer = storyGame.players[currentPlayerIndex];
        const playerMessage = await promptPlayerForSentence(currentPlayer, message.chat);

        if (playerMessage) {
            storyGame.story.push(playerMessage);
            conn.sendMessage(message.chat, `Story updated: ${storyGame.story.join(' ')}`, { quoted: message });
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % storyGame.players.length;

        // If 1.5 minutes have passed or enough contributions are made, end the game
        if ((Date.now() - storyGame.startTime) >= 90000 || storyGame.story.length >= 10) {
            clearInterval(writingTimeout);
            endStoryGame(message);
        }
    }, 15000); // 15 seconds for each player

    storyGame.startTime = Date.now();
}

// Prompt player for a sentence
async function promptPlayerForSentence(player, chat) {
    // Placeholder for getting a response from the player
    // In practice, you'd use something like message listeners or additional timeouts for interaction
    return `Player ${player}'s contribution to the story!`; // Mock response
}

// End the game and display the full story
async function endStoryGame(message) {
    clearTimeout(storyGame.joinTimeout);
    conn.sendMessage(message.chat, `The game has ended! Here's the full story: ${storyGame.story.join(' ')}`, { quoted: message });
    storyGame.active = false;
}

// Export functions for bot to use
module.exports = {
    startStoryGame,
    joinStoryGame
};
