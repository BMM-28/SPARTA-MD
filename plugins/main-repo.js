const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/BMM-28/SPARTA-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `*𝐁𝐎𝐓 𝐍𝐀𝐌𝐄:*\n> ${repoData.name}\n\n*𝐎𝐖𝐍𝐄𝐑 𝐍𝐀𝐌𝐄:*\n> ${repoData.owner.login}\n\n*𝐒𝐓𝐀𝐑𝐒:*\n> ${repoData.stargazers_count}\n\n*𝐅𝐎𝐑𝐊𝐒:*\n> ${repoData.forks_count}\n\n*𝐆𝐈𝐓𝐇𝐔𝐁 𝐋𝐈𝐍𝐊:*\n> ${repoData.html_url}\n\n*DESCRIPTION:*\n> ${repoData.description || '𝐍𝐨 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧'}\n\n*𝐃𝐨𝐧'𝐭 𝐟𝐨𝐫𝐠𝐞𝐭 𝐭𝐨 𝐟𝐨𝐫𝐤 𝐭𝐡𝐞 𝐫𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲*\n\n> *𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃🖤*`;

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/zvrvm9.jpg` },
            caption: formattedInfo,
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
        }, { quoted: mek });

        // Send local audio file
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mp4',
            ptt: true,
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
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
