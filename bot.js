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
    if (message.content === '!A3restart') {
        if (message.member.roles.cache.find(r => r.name === "Commander")){
            ssh.connect({
                host: process.env.SERVER_IP,
                port: process.env.SERVER_PORT,
                username: process.env.SERVER_USER,
                password: process.env.SERVER_PASSWORD,
                tryKeyboard: true,
            })
            .then(function() {
                message.channel.send('Connected to SSH...')
                message.channel.send('Executing Arma 3 server restart...')
                try {
                    ssh.execCommand('./arma3server restart').then(function(result) {
                        console.log('STDOUT: ' + result.stdout)
                        console.log('STDERR: ' + result.stderr)
                        const embededResponse = new Discord.MessageEmbed()
                            .setColor('#5ef059')
                            .setTitle('Arma 3 Server Restart')
                            .setDescription('You server has been restarted succesfully!')
                            .setThumbnail('https://i.imgur.com/6fVQuBg.png')
                            .setTimestamp()
                        message.channel.send(embededResponse);
                    })
                // message.reply("I have restarted the Arma 3 server!")
                } catch {
                    message.reply('Command executing error!')
                }
            })
        } else {
            message.reply('Access denied!')
        }
    }    
});


client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret