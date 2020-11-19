module.exports = {
    name: 'newrole',
    description: 'Create new role',
    args: true,
    usage: '<color> <role name>',
    aliases: ['more pls', 'add role'],
    execute(message, args) {
        const roleName= args.slice(0).join(' ');

        console.log("Roles: " + roleName);

        if (message.author.id === '255865168708370432') {
            message.guild.roles.create({
                data: {
                    name: roleName,
                    color: 'RANDOM',
                },
            })
        } else {
            message.channel.send('Nice try.');
        }
    },
};