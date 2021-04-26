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
    if (message.content === 'testing') {
        console.log(message.member)
        // if (message.member.roles.cache.find(r => r.name === "Commander")){
        //     message.reply('Access granted!');
        // } else {
        //     message.reply('Access denied!')
        // }
    }    
});


client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret