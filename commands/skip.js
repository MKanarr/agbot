module.exports = {
    name: 'skip',
    description: 'Skip songs',
    args: false,
    aliases: ['next'],
    execute(message, args) {
      const serverQueue = queue.get(message.guild.id);

      if (!serverQueue) {
        console.log('nothing is playing');
        return message.channel.send('You are crazy, nothing is playing');
      }

      serverQueue.connection.dispatcher.end();
      return message.channel.send('Skipped song');
    },
};
