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
        if (message.member.roles.cache.find(r => r.name === "Commander")){
            ssh.connect({
                host: process.env.SERVER_IP,
                port: process.env.SERVER_PORT,
                username: process.env.SERVER_USER,
                password: process.env.SERVER_PASSWORD,
                tryKeyboard: true,
            })
            message.reply('Connected to SSH!')
            try {
                ssh.execCommand('ls').then(function(result) {
                    console.log('STDOUT: ' + result.stdout)
                    console.log('STDERR: ' + result.stderr)
                })
            } catch {
                message.reply('Command executing error!')
            }
        } else {
            message.reply('Access denied!')
        }
    }    
});


client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret