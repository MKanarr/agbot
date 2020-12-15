module.exports = {
    name: 'role',
    description: 'Role!',
    args: true,
    usage: '<user> <add/remove> <role>',
    aliases: ['role', 'add roles'],
    execute(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
          return message.channel.send('Nice try.');
        }

        const role = message.guild.roles.cache.find(role => role.name === args.slice(args.length - 1).join(' '));

        console.log(role);
        // console.log(message.mentions.members.first());
        // issue ned an array of roles
        const response = message.mentions.members.map(member => {
            var text;

            if (args[args.length - 2] === 'add') {
              text = `Added ${role} to`;
              member.roles.add(role).catch(console.error);
            } else if (args[args.length - 2] === 'remove') {
              text = `Removed ${role} from`;
              member.roles.remove(role).catch(console.error);
            }

            return `${text} ${member}`;
        });


        // console.log(member);

        message.channel.send(response);
    },
};
