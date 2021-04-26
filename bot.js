const Discord = require('discord.js');
const {NodeSSH} = require('node-ssh')

const client = new Discord.Client();
const ssh = new NodeSSH()
 

client.on('ready', () => {
    console.log('I am ready!');
});

 

client.on('message', message => {
    if (message.content === 'ping') {
       message.reply('pong');
       }    
});

client.on('message', message => {
    if (message.content === 'pytanie zarząd') {
        if (message.member.roles.cache.some(role => role.name === 'Commander')){
            message.reply('odpowiedź zarząd');
        }
    }    
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret