const chalk = require('chalk');
const storyGames = {}; // State tracking for story games per chat ID

// Helper functions to manage story games
function getStoryGame(chatId) {
    if (!storyGames[chatId]) {
        storyGames[chatId] = {
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
                "On a stormy night...",
                "On a normal morning...",
                "Depressed and angry...",
            ]
        };
    }
    return storyGames[chatId];
}

// Command to start the story game
async function startStoryCommand(chatId, sendMessage) {
    const storyGame = getStoryGame(chatId);

    if (storyGame.active) {
        await sendMessage(chatId, "The story game is already active!");
        return;
    }

    storyGame.active = true;
    storyGame.players = [];
    storyGame.story = [];

    const randomStart = storyGame.storyStarts[Math.floor(Math.random() * storyGame.storyStarts.length)];
    storyGame.story.push(randomStart);

    await sendMessage(chatId, `The story-building game has started!\nType .join to participate. You have 30 seconds to join.`);

    storyGame.joinTimeout = setTimeout(async () => {
        if (storyGame.players.length < 3) {
            const playersNeeded = 3 - storyGame.players.length;
            await sendMessage(chatId, `The game couldn't start. At least 3 players are needed. ${playersNeeded} more players required.`);
            storyGame.active = false;
        } else {
            await startStoryWriting(chatId, sendMessage);
        }
    }, 30000);
}

// Command to join the story game
async function joinStoryCommand(chatId, sender, sendMessage) {
    const storyGame = getStoryGame(chatId);

    if (!storyGame.active) {
        await sendMessage(chatId, "There's no active story-building game right now.");
        return;
    }

    if (storyGame.players.includes(sender)) {
        await sendMessage(chatId, "You have already joined the game!");
        return;
    }

    storyGame.players.push(sender);
    await sendMessage(chatId, `You have joined the game! Total players: ${storyGame.players.length}`);
}

// Function to start the story-writing phase
async function startStoryWriting(chatId, sendMessage) {
    const storyGame = getStoryGame(chatId);

    storyGame.startTime = Date.now();
    await sendMessage(chatId, "The story-writing game is starting! Each player has 15 seconds to contribute a sentence.");

    let currentPlayerIndex = 0;

    storyGame.timer = setInterval(async () => {
        const currentPlayer = storyGame.players[currentPlayerIndex];

        const playerSentence = await promptPlayerForSentence(currentPlayer, chatId, sendMessage);
        if (playerSentence) {
            storyGame.story.push(playerSentence);
            await sendMessage(chatId, `Updated story: ${storyGame.story.join(' ')}`);
        } else {
            await sendMessage(chatId, `@${currentPlayer} missed their turn.`, {
                mentions: [currentPlayer]
            });
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % storyGame.players.length;

        if ((Date.now() - storyGame.startTime) >= 90000 || storyGame.story.length >= 10) {
            clearInterval(storyGame.timer);
            await endStoryGame(chatId, sendMessage);
        }
    }, 15000);
}

// Prompt a player to contribute a sentence
async function promptPlayerForSentence(player, chatId, sendMessage) {
    const storyGame = getStoryGame(chatId);

    await sendMessage(chatId, `@${player}, it's your turn! Contribute a sentence to the story:`, {
        mentions: [player]
    });

    return new Promise((resolve) => {
        let listener = conn.on('message', (message) => {
            if (message.sender === player && message.chat === chatId && !message.body.startsWith('.')) {
                conn.off('message', listener);
                resolve(message.body.trim());
            }
        });

        setTimeout(() => {
            conn.off('message', listener);
            resolve(null);
        }, 15000);
    });
}

// End the story-building game
async function endStoryGame(chatId, sendMessage) {
    const storyGame = getStoryGame(chatId);

    clearTimeout(storyGame.joinTimeout);
    storyGame.active = false;

    if (storyGame.story.length > 1) {
        await sendMessage(chatId, `The game has ended! Here's the final story:\n\n${storyGame.story.join(' ')}`);
    } else {
        await sendMessage(chatId, "The game ended with no contributions.");
    }
}

// Example usage of the commands
async function handleMessage(message) {
    const chatId = message.chat;
    const sender = message.sender;
    const sendMessage = async (chatId, text, options = {}) => {
        console.log(chalk.green(`[SendMessage] To: ${chatId}, Message: ${text}`));
        // Replace this with your bot's actual sendMessage implementation
    };

    if (message.body.startsWith('.startstory')) {
        await startStoryCommand(chatId, sendMessage);
    } else if (message.body.startsWith('.join')) {
        await joinStoryCommand(chatId, sender, sendMessage);
    }
}

// Example: Simulating incoming messages
handleMessage({ chat: 'chat1', sender: 'user1', body: '.startstory' });
handleMessage({ chat: 'chat1', sender: 'user2', body: '.join' });
handleMessage({ chat: 'chat1', sender: 'user3', body: '.join' });
