const { Guild } = require("discord.js");

module.exports = {
    name: 'channel',
    description: 'Create new channel',
    args: true,
    usage: '<channel_name> <text/voice>',
    aliases: ['channel', 'add channel'],
    execute(message, args) {
        const channelName = args[0];
        const channelType = args[1];

        if (message.author.id === '255865168708370432') {
            message.guild.channels.create(channelName, {
                type: channelType,
                parent: channelType + ' channels',
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
        } else {
            message.channel.send('Nice try.');
        }
    },
};