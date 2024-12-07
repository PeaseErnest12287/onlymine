const schedule = require('node-schedule');

async function groupMuteSchuler(conn) {
    // Schedule group mute tasks (example)
    schedule.scheduleJob('0 22 * * *', async () => {
        const groupId = 'your-group-id'; // Use appropriate group ID
        await conn.groupMute(groupId, 3600); // Mute the group for 1 hour
    });
}

async function groupUnmuteSchuler(conn) {
    // Schedule group unmute tasks (example)
    schedule.scheduleJob('0 6 * * *', async () => {
        const groupId = 'your-group-id'; // Use appropriate group ID
        await conn.groupUnmute(groupId); // Unmute the group
    });
}

module.exports = {
    groupMuteSchuler,
    groupUnmuteSchuler,
};
