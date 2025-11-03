const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "setting",
    alias: ["config", "settings"],
    desc: "Show all bot configuration variables (Owner Only)",
    category: "system",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return reply("🚫 *Owner Only Command!* You're not authorized to view bot configurations.");
        }

        let envSettings = `
╭───『 *${config.BOT_NAME} 𝐂𝐎𝐍𝐅𝐈𝐆* 』───❏
│
├─❏ *🤖 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎*
│  ├─∘ *𝐍𝐚𝐦𝐞:* ${config.BOT_NAME}
│  ├─∘ *𝐏𝐫𝐞𝐟𝐢𝐱:* ${config.PREFIX}
│  ├─∘ *𝐎𝐰𝐧𝐞𝐫:* ${config.OWNER_NAME}
│  ├─∘ *𝐍𝐮𝐦𝐛𝐞𝐫:* ${config.OWNER_NUMBER}
│  └─∘ *𝐌𝐨𝐝𝐞:* ${config.MODE.toUpperCase()}
│
├─❏ *⚙️ 𝐂𝐎𝐑𝐄 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒*
│  ├─∘ *𝐏𝐮𝐛𝐥𝐢𝐜 𝐌𝐨𝐝𝐞:* ${isEnabled(config.PUBLIC_MODE) ? "✅" : "❌"}
│  ├─∘ *𝐀𝐥𝐰𝐚𝐲𝐬 𝐎𝐧𝐥𝐢𝐧𝐞:* ${isEnabled(config.ALWAYS_ONLINE) ? "✅" : "❌"}
│  ├─∘ *𝐑𝐞𝐚𝐝 𝐌𝐬𝐠𝐬:* ${isEnabled(config.READ_MESSAGE) ? "✅" : "❌"}
│  └─∘ *𝐑𝐞𝐚𝐝 𝐂𝐦𝐝𝐬:* ${isEnabled(config.READ_CMD) ? "✅" : "❌"}
│
├─❏ *🔌 𝐀𝐔𝐓𝐎𝐌𝐀𝐓𝐈𝐎𝐍*
│  ├─∘ *𝐀𝐮𝐭𝐨 𝐑𝐞𝐩𝐥𝐲:* ${isEnabled(config.AUTO_REPLY) ? "✅" : "❌"}
│  ├─∘ *𝐀𝐮𝐭𝐨 𝐑𝐞𝐚𝐜𝐭:* ${isEnabled(config.AUTO_REACT) ? "✅" : "❌"}
│  ├─∘ *𝐂𝐮𝐬𝐭𝐨𝐦 𝐑𝐞𝐚𝐜𝐭:* ${isEnabled(config.CUSTOM_REACT) ? "✅" : "❌"}
│  ├─∘ *𝐑𝐞𝐚𝐜𝐭 𝐄𝐦𝐨𝐣𝐢𝐬:* ${config.CUSTOM_REACT_EMOJIS}
│  ├─∘ *𝐀𝐮𝐭𝐨 𝐒𝐭𝐢𝐜𝐤𝐞𝐫:* ${isEnabled(config.AUTO_STICKER) ? "✅" : "❌"}
│
├─❏ *📢 𝐒𝐓𝐀𝐓𝐔𝐒 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒*
│  ├─∘ *𝐒𝐭𝐚𝐭𝐮𝐬 𝐒𝐞𝐞𝐧:* ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅" : "❌"}
│  ├─∘ *𝐒𝐭𝐚𝐭𝐮𝐬 𝐑𝐞𝐩𝐥𝐲:* ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅" : "❌"}
│  ├─∘ *𝐒𝐭𝐚𝐭𝐮𝐬 𝐑𝐞𝐚𝐜𝐭:* ${isEnabled(config.AUTO_STATUS_REACT) ? "✅" : "❌"}
│  └─∘ *𝐒𝐭𝐚𝐭𝐮𝐬 𝐌𝐬𝐠:* ${config.AUTO_STATUS_MSG}
│
├─❏ *🛡️ 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘*
│  ├─∘ *𝐀𝐧𝐭𝐢-𝐥𝐢𝐧𝐤:* ${isEnabled(config.ANTI_LINK) ? "✅" : "❌"}
│  ├─∘ *𝐀𝐧𝐭𝐢-𝐁𝐚𝐝:* ${isEnabled(config.ANTI_BAD) ? "✅" : "❌"}
│  ├─∘ *𝐀𝐧𝐭𝐢-𝐕𝐕:* ${isEnabled(config.ANTI_VV) ? "✅" : "❌"}
│  └─∘ *𝐃𝐞𝐥 𝐋𝐢𝐧𝐤𝐬:* ${isEnabled(config.DELETE_LINKS) ? "✅" : "❌"}
│
├─❏ *🎨 𝐌𝐄𝐃𝐈𝐀*
│  ├─∘ *𝐀𝐥𝐢𝐯𝐞 𝐈𝐦𝐚𝐠𝐞:* ${config.ALIVE_IMG}
│  ├─∘ *𝐌𝐞𝐧𝐮 𝐈𝐦𝐚𝐠𝐞:* ${config.MENU_IMAGE_URL}
│  ├─∘ *𝐀𝐥𝐢𝐯𝐞 𝐌𝐬𝐠:* ${config.LIVE_MSG}
│  └─∘ *𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐏𝐚𝐜𝐤:* ${config.STICKER_NAME}
│
├─❏ *⏳ 𝐌𝐈𝐒𝐂*
│  ├─∘ *𝐀𝐮𝐭𝐨 𝐓𝐲𝐩𝐢𝐧𝐠:* ${isEnabled(config.AUTO_TYPING) ? "✅" : "❌"}
│  ├─∘ *𝐀𝐮𝐭𝐨 𝐑𝐞𝐜𝐨𝐫𝐝𝐢𝐧𝐠:* ${isEnabled(config.AUTO_RECORDING) ? "✅" : "❌"}
│  ├─∘ *𝐀𝐧𝐭𝐢-𝐃𝐞𝐥 𝐏𝐚𝐭𝐡:* ${config.ANTI_DEL_PATH}
│  └─∘ *𝐃𝐞𝐯 𝐍𝐮𝐦𝐛𝐞𝐫:* ${config.DEV}
│
╰───『 *${config.DESCRIPTION}* 』───❏
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true
                }
            },
            { quoted: mek }
        );

    } catch (error) {
        console.error('Env command error:', error);
        reply(`❌ Error displaying config: ${error.message}`);
    }
});
