const { cmd } = require('../command');
const os = require('os');
const moment = require('moment');
const speed = require('performance-now');
const { exec } = require('child_process');
const config = require('../config');

cmd({
    pattern: "sysinfo",
    alias: ["systeminfo", "serverinfo", "status"],
    desc: "Display detailed system information of the bot server",
    category: "info",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Calculate uptime in a readable format
        const uptime = moment.duration(os.uptime(), 'seconds').humanize();
        
        // Calculate CPU usage (async)
        const cpuUsage = await getCpuUsage();
        
        // Memory usage (GB)
        const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2);
        const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        
        // Network info (IP)
        const networkInfo = os.networkInterfaces();
        let ipAddress = "N/A";
        Object.keys(networkInfo).forEach(interface => {
            networkInfo[interface].forEach(details => {
                if (details.family === 'IPv4' && !details.internal) {
                    ipAddress = details.address;
                }
            });
        });

        // Disk space (Linux/MacOS only)
        let diskSpace = "N/A";
        if (os.platform() !== 'win32') {
            diskSpace = await getDiskSpace();
        }

        // Bot info
        const botInfo = {
            name: config.BOT_NAME || "YourBot",
            version: config.VERSION || "𝟏.𝟎.𝟎",
            creator: "𝐒𝐏𝐀𝐑𝐓𝐀-𝐌𝐃 👑",
            contact: "+𝟐𝟓𝟒𝟕𝟗𝟓𝟒𝟓𝟐𝟒𝟒𝟒"
        };

        // Generate a beautiful system info message
        const sysInfoMessage = `
╭───「 🖥️ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍* 🖥️ 」───
│
│ *🤖 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄:* ${botInfo.name}
│ *🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* ${botInfo.version}
│ *👑 𝐂𝐫𝐞𝐚𝐭𝐨𝐫:* ${botInfo.creator} (${botInfo.contact})
│
│ *💻 𝐇𝐨𝐬𝐭 𝐧𝐚𝐦𝐞:* ${os.hostname()}
│ *🛠️ 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦:* ${os.platform()} (${os.arch()})
│ *⏳ 𝐔𝐩𝐭𝐢𝐦𝐞:* ${uptime}
│
│ *⚡ 𝐂𝐏𝐔:* ${os.cpus()[0].model}
│ *📊 𝐂𝐏𝐔 𝐔𝐬𝐚𝐠𝐞:* ${cpuUsage}%
│ *🧠 𝐑𝐀𝐌:* ${usedMem}𝐆𝐁 / ${totalMem}𝐆𝐁 (${Math.round((usedMem / totalMem) * 100)}% used)
│ *💾 𝐃𝐢𝐬𝐤:* ${diskSpace}
│ *🌐 𝐈𝐏:* ${ipAddress}
│
╰─────────────────────

🔧 *Bot maintained by 𝐒𝐩𝐚𝐫𝐭𝐚-𝐓𝐞𝐜𝐡*`;

        await reply(sysInfoMessage);

    } catch (e) {
        console.error("Sysinfo Command Error:", e);
        await reply("❌ Failed to fetch system details. Please try again later.");
    }
});

// Helper function to calculate CPU usage
async function getCpuUsage() {
    const start = speed();
    const startCpu = os.cpus().map(cpu => cpu.times);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const end = speed();
    const endCpu = os.cpus().map(cpu => cpu.times);

    const elapsed = (end - start) / 1000;
    const cpuUsage = endCpu.map((cpu, i) => {
        const startTotal = Object.values(startCpu[i]).reduce((a, b) => a + b, 0);
        const endTotal = Object.values(cpu).reduce((a, b) => a + b, 0);
        const totalDiff = endTotal - startTotal;
        const idleDiff = cpu.idle - startCpu[i].idle;
        return Math.round(100 - (idleDiff / totalDiff) * 100);
    });

    return cpuUsage.reduce((a, b) => a + b, 0) / cpuUsage.length;
}

// Helper function to get disk space (Linux/MacOS)
async function getDiskSpace() {
    return new Promise((resolve) => {
        exec("df -h /", (error, stdout) => {
            if (error) return resolve("N/A");
            const lines = stdout.trim().split("\n");
            if (lines.length > 1) {
                const parts = lines[1].split(/\s+/);
                resolve(`${parts[2]}B used / ${parts[1]}B total (${parts[4]})`);
            } else {
                resolve("N/A");
            }
        });
    });
}