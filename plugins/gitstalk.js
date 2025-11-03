const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞*: ${data.name || data.login}
🔗 *𝐆𝐢𝐭𝐡𝐮𝐛 𝐮𝐫𝐥*:(${data.html_url})
📝 *𝐁𝐢𝐨*: ${data.bio || 'Not available'}
🏙️ *𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧*: ${data.location || 'Unknown'}
📊 *𝐏𝐮𝐛𝐥𝐢𝐜 𝐑𝐞𝐩𝐨𝐬*: ${data.public_repos}
👥 *𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬*: ${data.followers} | Following: ${data.following}
📅 *𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐚𝐭*: ${new Date(data.created_at).toDateString()}
🔭 *𝐏𝐮𝐛𝐥𝐢𝐜 𝐆𝐢𝐬𝐭𝐬*: ${data.public_gists}
> *𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃*`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.avatar_url },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});


