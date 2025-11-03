const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
╭───〔 *🤖 ${config.BOT_NAME} 𝐒𝐓𝐀𝐓𝐔𝐃* 〕───◉
│✨ *𝙱𝙾𝚃 𝙸𝚂 𝙰𝙲𝚃𝙸𝚅𝙴 & 𝙾𝙽𝙻𝙸𝙽𝙴!*
│
│🧠 *𝐎𝐰𝐧𝐞𝐫:* ${config.OWNER_NAME}
│⚡ *𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* 𝟏.𝟎.𝟎
│📝 *𝐏𝐫𝐞𝐟𝐢𝐱:* [${config.PREFIX}]
│📳 *𝐌𝐨𝐝𝐞:* [${config.MODE}]
│💾 *𝐑𝐀𝐌:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}𝐌𝐁 / ${(os.totalmem() / 1024 / 1024).toFixed(2)}𝐌𝐁
│🖥️ *𝐇𝐨𝐬𝐭:* ${os.hostname()}
│⌛ *𝐔𝐩𝐭𝐢𝐦𝐞:* ${runtime(process.uptime())}
╰────────────────────◉
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363361547835257@newsletter',
                    newsletterName: '𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
