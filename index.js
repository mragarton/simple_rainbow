let Discord = require('discord.js'), fs = require('fs'), Rainbow = require('color-rainbow'), client = new Discord.Client(), data = JSON.parse(fs.readFileSync('./cfg.json')), colors = [], update = async _ => colors = data["type"] === 'BW' ? [0x000001, 0xFFFFFF] : Rainbow.create(data["rainbowArraySize"]);
client.on('message', m => {
  if (m.mentions.users.has(client.user.id)) return m.channel.send('**GitHub repo:** https://github.com/mragarton/simple_rainbow').catch(_ => { });
});
client.login(data["token"]).then(_ => {
  console.log(`${client.user.tag}: Logged in!`);
  const guild = client.guilds.find(g => g.name.toLowerCase() === data["guildName"].toLowerCase());
  if (!guild) return console.log('Cannot find guild. (Please check the config file!)');
  const role = guild.roles.find(r => r.name.toLowerCase() === data["roleName"].toLowerCase());
  if (!role) return console.log('Cannot find role. (Please check the config file!)');
  colorize(role);
}).catch(console.error);
const colorize = async role => {
  console.log(`Colorizing started! (${data["changeRate"]} seconds)`);
  setInterval(async _ => {
    if (colors.length === 0) await update();
    const color = colors.pop();
    role.setColor(data["type"] === 'BW' ? color : color.values.rgb).catch(_ => { });
  }, data["changeRate"] * 1000);
};
