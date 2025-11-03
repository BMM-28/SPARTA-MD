const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "𝐆𝐞𝐭 𝐩𝐚𝐢𝐫𝐢𝐧𝐠 𝐜𝐨𝐝𝐞 𝐟𝐨𝐫 𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃 𝐁𝐨𝐭",
    category: "download",
    use: ".pair 2547123456XXX",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // Extract phone number from command
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // Validate phone number format
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 2547123456XXX`");
        }

        // Make API request to get pairing code
        const response = await axios.get(`https://qadeer-ai-pair.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        const doneMessage = "> *𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃 𝐏𝐀𝐈𝐑𝐈𝐍𝐆 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃*";

        // Send initial message with formatting
        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        // Optional 2-second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send clean code again
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});
