module.exports = {
    name: 'role',
    description: 'Role!',
    args: true,
    usage: '<user> <add/remove> <role>',
    aliases: ['role', 'add roles'],
    execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === args.slice(2).join(' '));
        const member = message.mentions.members.first();

        if (message.author.id === '255865168708370432') {
            if (args[1] === 'add') {
                member.roles.add(role).catch(console.error);
            } else if (args[1] === 'remove') {
                member.roles.remove(role).catch(console.error);
            }
        } else {
            message.channel.send('Nice try.');
        }
    },
};