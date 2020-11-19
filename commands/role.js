module.exports = {
    name: 'role',
    description: 'Role!',
    args: true,
    usage: '<user> <add/remove> <role>',
    aliases: ['role', 'add roles'],
    execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === args.slice(args.length - 1).join(' '));

        // console.log(message.mentions.members.first());
        
        const response = message.mentions.members.map(member => {
            if (message.author.id === '255865168708370432') {
                if (args[args.length - 2] === 'add') {
                    member.roles.add(role).catch(console.error);
                } else if (args[args.length - 2] === 'remove') {
                    member.roles.remove(role).catch(console.error);
                }
            } else {
                return 'Nice Try.';
            }

            return 'Success';
        });


        // console.log(member);

        message.channel.send(response);
    },
};


  