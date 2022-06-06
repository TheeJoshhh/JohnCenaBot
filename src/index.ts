import Discord, { Intents } from 'discord.js';
import { DISCORD_TOKEN } from './config.json';
import presenceManager from './utils/presenceManager';
import { manager } from './utils/fightManager';

const client = new Discord.Client({ intents: [ 
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILDS
] });

client.on('ready', async () => {
    console.log(`${client.user?.username} is online and ready to fight!`);
    presenceManager(client);
    manager(client);
});

client.login(DISCORD_TOKEN);