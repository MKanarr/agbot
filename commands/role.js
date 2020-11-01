module.exports = {
    name: 'role',
    description: 'Role!',
    args: true,
    usage: '<user> <roles> <add/remove>',
    aliases: ['role', 'add roles'],
    execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === 'Denizen');
        const member = message.mentions.members.first();

        if (member.roles.cache.some(role => role.name === 'Owner')) {
            if (args[2] === 'add') {
                member.roles.add(role).catch(console.error);
            } else if (args[2] === 'remove') {
                member.roles.remove(role).catch(console.error);
            }
        } else {
            message.channel.send('Nice try.');
        }
    },
};