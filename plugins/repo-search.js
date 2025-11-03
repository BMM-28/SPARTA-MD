const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "srepo",
  desc: "Fetch information about a GitHub repository.",
  category: "other",
  react: "🍃",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply("❌ Please provide a GitHub repository in the format 📌 `owner/repo`.");
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `📁 *𝐆𝐢𝐭𝐡𝐮𝐛 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲 𝐈𝐧𝐟𝐨* 📁\n\n`;
    responseMsg += `📌 *𝐍𝐚𝐦𝐞*: ${data.name}\n`;
    responseMsg += `🔗 *𝐔𝐑𝐋*: ${data.html_url}\n`;
    responseMsg += `📝 *𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧*: ${data.description || "𝐍𝐨 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧"}\n`;
    responseMsg += `⭐ *𝐒𝐭𝐚𝐫𝐬*: ${data.stargazers_count}\n`;
    responseMsg += `🍴 *𝐅𝐨𝐫𝐤𝐬*: ${data.forks_count}\n`;
    responseMsg += `👤 *𝐎𝐰𝐧𝐞𝐫𝐬*: ${data.owner.login}\n`;
    responseMsg += `📅 *𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐀𝐭*: ${new Date(data.created_at).toLocaleDateString()}\n`;
    responseMsg += `\n> *© Powered by 𝐒𝐏𝐀𝐑𝐓𝐀*`;

    await conn.sendMessage(from, { text: responseMsg }, { quoted: m });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`❌ Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
});