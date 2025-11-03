const config = require('../config')
const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')

cmd({
    pattern: "list",
    alias: ["listcmd", "commands"],
    desc: "Show all available commands with descriptions",
    category: "menu",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Count total commands and aliases
        const totalCommands = Object.keys(commands).length
        let aliasCount = 0
        Object.values(commands).forEach(cmd => {
            if (cmd.alias) aliasCount += cmd.alias.length
        })

        // Get unique categories count
        const categories = [...new Set(Object.values(commands).map(c => c.category))]

        let menuText = `╭───『 *${config.BOT_NAME} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓* 』───⳹
│
│ *🛠️ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍*
│ • 🤖 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: ${config.BOT_NAME}
│ • 👑 𝐎𝐰𝐧𝐞𝐫: ${config.OWNER_NAME}
│ • ⚙️ 𝐏𝐫𝐞𝐟𝐢𝐱: [${config.PREFIX}]
│ • 🌐 𝐏𝐥𝐚𝐭𝐟𝐢𝐫𝐦: 𝐇𝐞𝐫𝐨𝐤𝐮
│ • 📦 Version: 𝟏.𝟎.𝟎
│ • 🕒 𝐑𝐮𝐧𝐭𝐢𝐦𝐞: ${runtime(process.uptime())}
│
│ *📊 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐒𝐓𝐀𝐓𝐒*
│ • 📜 𝐓𝐨𝐭𝐚𝐥 𝐂𝐦𝐝𝐬: ${totalCommands}
│ • 🔄 𝐓𝐨𝐭𝐚𝐥 𝐀𝐥𝐢𝐚𝐬𝐞𝐬: ${aliasCount}
│ • 🗂️ 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞𝐬: ${categories.length}
│
╰────────────────⳹\n`

        // Organize commands by category
        const categorized = {}
        categories.forEach(cat => {
            categorized[cat] = Object.values(commands).filter(c => c.category === cat)
        })

        // Generate menu for each category
        for (const [category, cmds] of Object.entries(categorized)) {
            menuText += `╭───『 *${category.toUpperCase()}* 』───⳹
│ • 📂 Commands: ${cmds.length}
│ • 🔄 Aliases: ${cmds.reduce((a, c) => a + (c.alias ? c.alias.length : 0), 0)}
│
`

            cmds.forEach(c => {
                menuText += `┃▸📄 COMMAND: .${c.pattern}\n`
                menuText += `┃▸❕ ${c.desc || 'No description available'}\n`
                if (c.alias && c.alias.length > 0) {
                    menuText += `┃▸🔹 Aliases: ${c.alias.map(a => `.${a}`).join(', ')}\n`
                }
                if (c.use) {
                    menuText += `┃▸💡 Usage: ${c.use}\n`
                }
                menuText += `│\n`
            })
            
            menuText += `╰────────────────⳹\n`
        }

        menuText += `\n📝 *Note*: Use ${config.PREFIX}help <command> for detailed help\n`
        menuText += `> ${config.DESCRIPTION}`

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/hheb1q.jpg' },
                caption: menuText,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true
                }
            },
            { quoted: mek }
        )

    } catch (e) {
        console.error('Command List Error:', e)
        reply(`❌ Error generating command list: ${e.message}`)
    }
})
