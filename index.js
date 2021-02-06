const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');
const editJsonFile = require("edit-json-file");

const client = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });;
dotenv.config();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!\nhttps://discord.com/oauth2/authorize?client_id=807596005687820308&scope=bot');
});

client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).run(client, message, args, process.env.PREFIX);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('guildMemberAdd', member => {

	const id = member.id

	const file = editJsonFile(`nickConfig`);
	nickname = file.get(id);
	console.log(member.id)
	

	// member.id

	member.setNickname(nickname)
	
	
	
});

client.login(process.env.TOKEN);
