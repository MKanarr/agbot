module.exports = {
    name: 'newrole',
    description: 'Create new role',
    args: true,
    usage: '<role name>',
    aliases: ['more pls', 'add role'],
    execute(message, args) {

      if (!message.member.hasPermission('ADMINISTRATOR')) {
        console.log(message.member.hasPermission('ADMINISTRATOR'));
        return message.channel.send('You are not an admin');
      }

      const roleName= args.slice(0).join(' ');

        console.log("Roles: " + roleName);

        message.guild.roles.create({
            data: {
                name: roleName,
                color: 'RANDOM',
            },
        })

        // if (message.author.id === '255865168708370432') {
        //     message.guild.roles.create({
        //         data: {
        //             name: roleName,
        //             color: 'RANDOM',
        //         },
        //     })
        // } else {
        //     message.channel.send('Nice try.');
        // }
    },
};
