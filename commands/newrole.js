module.exports = {
    name: 'newrole',
    description: 'Create new role',
    args: true,
    usage: '<color> <role name>',
    aliases: ['more pls', 'add role'],
    execute(message, args) {
        const roleColor= args[0];
        const roleName = args.slice(1).join(' ');

        console.log("Role Color: " + roleColor);
        console.log("Role Name: " + roleName);

        if (message.author.id === '255865168708370432') {
            message.guild.roles.create({
                data: {
                    name: roleName,
                    color: roleColor,
                },
            })
        } else {
            message.channel.send('Nice try.');
        }
    },
};