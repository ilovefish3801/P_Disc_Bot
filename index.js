const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = 'MTM2MDY3NDY1MDQ3MjA1NDk4Ng.GpsCDA.2VmCrtGaYef847pFLfwc4M_Wq_Azr1g7yyYp5w'; // Replace with your bot token
const NICKNAME = 'Pasha';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  setInterval(async () => {

    

    client.guilds.cache.forEach(async (guild) => {
      try {
        const members = await guild.members.fetch();
        members.forEach(async (member) => {
          if (member.manageable && member.nickname !== NICKNAME) {
            try {
              await member.setNickname(NICKNAME);
              console.log(`Changed ${member.user.username}'s nickname to ${NICKNAME}`);
            } catch (err) {
              console.warn(`Failed to change ${member.user.username}'s nickname: ${err.message}`);
            }
          }
        });
      } catch (err) {
        console.error(`Failed to fetch members in ${guild.name}:`, err);
      }
    });
  }, 15000);
});

client.login(TOKEN);