const { Guild } = require("discord.js");

module.exports = {
    name: 'channel',
    description: 'Create new channel',
    args: true,
    usage: '<channel_name> <text/voice>',
    aliases: ['chan', 'addchan', 'newchan'],
    execute(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
          return message.channel.send('Nice try.');
        }

        // parses out command name & prefix
        var re = new RegExp(/\b(?!channel|addchan|newchan|chan\b)\S[^~,]*/);
        // parses out channel type
        var reg = new RegExp(/voice$|text$/i);
        // parses out channel name
        var regi = new RegExp(/[^~,]*\S(?= text$| voice$)/i);

        var msg = message.content;

        console.log(message.content);

        // msg w/o cmd name & prefix
        var parsedMsg = msg.match(re)[0];

        // check if channel type is provided
        if (parsedMsg.match(reg) === null) {
          console.log('channel type not provided');
          return message.channel.send(`${message.author}, please provide a channel type: text or voice`);
        }

        var channelType = parsedMsg.match(reg)[0].toLowerCase();
        var channelName = parsedMsg.match(regi)[0];

        console.log(channelType);
        console.log(channelName);

        // const channelName = args[0];
        // const channelType = args[1];

        message.guild.channels.create(channelName, {
            type: channelType,
            // parent: channelType + ' channels',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        });
    },
};
