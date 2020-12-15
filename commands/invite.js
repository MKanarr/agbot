module.exports = {
    name: 'invite',
    description: 'Invite your friends to the server',
    args: false,
    aliases: ['inv'],
    execute(message, args) {
        message.channel.createInvite({ unique: true })
            .then(invite => message.channel.send(`${invite.url}`))
            .catch(console.error);
    },
};
