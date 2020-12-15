const { Guild } = require("discord.js");

module.exports = {
    name: 'channel',
    description: 'Create new channel',
    args: true,
    usage: '<channel_name> <text/voice>',
    aliases: ['channel', 'add channel'],
    execute(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
          return message.channel.send('Nice try.');
        }

        const channelName = args[0];
        const channelType = args[1];

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
