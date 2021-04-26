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

const createEmbed = function(color, title, description, thumbnail) {
    const embedMessage = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail)
        .setTimestamp()

    return embedMessage
}

client.on('message', message => {
    if (message.content === '!TFS help') {
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('ChadBot help')
            .setDescription('Displays all of the available ChadBot commands.')
            .setThumbnail('https://i.imgur.com/6fVQuBg.png')
            .addFields(
                { name: '!TFS restart', value: 'Restarts the TFS Arma 3 server.' },
            )
            .setTimestamp()
        }
        message.channel.send(embedMessage)
});

client.on('message', message => {
    if (message.content === '!TFS restart') {
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
                        const embededResponse = createEmbed('#5ef059', 'Arma 3 Server Restart', 'You server has been restarted succesfully!', 'https://i.imgur.com/6fVQuBg.png')
                        message.channel.send(embededResponse);
                    })
                } catch {
                    const embededResponse = createEmbed('#eb3434', 'Arma 3 Server Restart', 'There was an error while restarting the server!', 'https://i.imgur.com/6fVQuBg.png')
                    message.channel.send(embededResponse);
                }
            })
        } else {
            const embededResponse = createEmbed('#eb3434', 'Arma 3 Server Restart', 'Permission denied! You need the Commander role to do this.', 'https://i.imgur.com/6fVQuBg.png')
            message.channel.send(embededResponse);
        }
    }    
});


client.login(process.env.BOT_TOKEN);