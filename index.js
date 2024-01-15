const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Singapore', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1116390127640518679')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/nocopyrightsounds') //Must be a youtube video link 
    .setState('Cyberpunk 2077')
    .setName('SharpWoofer')
    .setDetails(`STREAMING SINCE [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1116393025506132028/1116571208843022406/nice-anime-girl-aesthetic-uwu.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('UwU Streamer') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1116393025506132028/1116571665527218286/opgamingmx.gif?width=454&height=455') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Verified') //Text when you hover the Small image
    .addButton('Movie Review', 'https://sharpwoofer.notion.site/1b34d77500304755aa52a3d9d2482cf0?v=5ac88f6806dc4470b804eb069cb56c25')
    .addButton('Steam', 'https://steamcommunity.com/id/sharpwoofer');

  client.user.setActivity(r);
  client.user.setPresence({ status: "online" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Time: [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);