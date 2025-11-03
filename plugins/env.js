const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require("os");
const path = require('path');
const axios = require('axios');
const fs = require('fs');

cmd({
    pattern: "env",
    desc: "menu the bot",
    category: "menu3",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const dec = `╭━━━〔 *${config.BOT_NAME} 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔* 〕━━━╮
┃ ✨ *𝐎𝐰𝐧𝐞𝐫:* ${config.OWNER_NAME}
┃ ⚙️ *𝐌𝐨𝐝𝐞:* ${config.MODE}
┃ 📡 *𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦:* 𝐇𝐞𝐫𝐨𝐤𝐮
┃ 🧠 *𝐓𝐲𝐩𝐞:* 𝐍𝐨𝐝𝐞𝐣𝐬 (𝐌𝐮𝐥𝐭𝐢 𝐃𝐞𝐯𝐢𝐜𝐞)
┃ ⌨️ *𝐏𝐫𝐞𝐟𝐢𝐱:* ${config.PREFIX}
┃ 🧾 *𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* 𝟏.𝟎.𝟎 𝐁𝐞𝐭𝐚
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 *𝐌𝐞𝐧𝐮* 〕━━┈⊷
‎┃◈╭─────────────·๏
‎┃◈┃• *admin-events*
‎┃◈┃• *welcome
‎┃◈┃• *setprefix
‎┃◈┃• *mode
‎┃◈┃• *auto_typing
‎┃◈┃• *always_online
‎┃◈┃• *auto_reacording
‎┃◈┃• *status_view
‎┃◈┃• *status_react
‎┃◈┃• *read_message
‎┃◈┃• *auto_sticker
‎┃◈┃• *anti_bad
‎┃◈┃• *auto_reply
‎┃◈┃• *auto_voice
‎┃◈┃• *custom_reacts
‎┃◈┃• *auto_react
‎┃◈┃• *anti_link
‎┃◈┃• *status_reply
‎┃◈└───────────┈⊷
‎╰──────────────┈⊷
> ${config.DESCRIPTION}
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363361547835257@newsletter',
                        newsletterName: '𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send local audio from assets/menu.m4a

const audioPath = path.join(__dirname, '../assets/menu.m4a');
await conn.sendMessage(from, {
    audio: fs.readFileSync(audioPath),
    mimetype: 'audio/mp4',
    ptt: true,
}, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e}`);
    }
});
