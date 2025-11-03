const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "creator",
    alias: ["creator", "coder", "dev"],
    desc: "Show bot creator information",
    category: "info",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Owner information (you can modify these values)
        const ownerInfo = {
            name: "𝐒𝐏𝐀𝐑𝐓𝐀-𝟐𝟖",
            number: "+𝟐𝟓𝟒𝟕𝟗𝟓𝟒𝟓𝟐𝟒𝟒𝟒",
            photo: "https://files.catbox.moe/w68guv.jpg",
            bio: "𝐓𝐡𝐞 𝐜𝐫𝐞𝐚𝐭𝐨𝐫 𝐨𝐟 𝐭𝐡𝐢𝐬 𝐚𝐦𝐚𝐳𝐢𝐧𝐠 𝐁𝐨𝐭"
        };

        // Beautiful formatted message
        const creatorMessage = `
╭───「 👑 *𝐂𝐑𝐄𝐀𝐓𝐎𝐑 𝐈𝐍𝐅𝐎* 👑 」───
│
│ *🪪 𝐍𝐚𝐦𝐞:* ${ownerInfo.name}
│ *📞 𝐍𝐮𝐦𝐛𝐞𝐫:* ${ownerInfo.number}
│ *📝 𝐁𝐢𝐨:* ${ownerInfo.bio}
│
│ *🤖 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞:* ${config.BOT_NAME}
│ *⚡ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* ${config.VERSION || "𝟏.𝟎.𝟎"}
│
╰─────────────────────

💡 *Contact for bot queries or support*`;

        // Send message with owner photo
        await conn.sendMessage(from, {
            image: { url: ownerInfo.photo },
            caption: creatorMessage,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Creator Command Error:", e);
        // Fallback text if image fails
        await reply(`👑 *𝐂𝐫𝐞𝐚𝐭𝐨𝐫 𝐈𝐧𝐟𝐨*\n\n𝐍𝐚𝐦𝐞: 𝐒𝐏𝐀𝐑𝐓𝐀-𝟐𝟖\nNumber: +254795452444\n\nContact for bot support!`);
    }
});

