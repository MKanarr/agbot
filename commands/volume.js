module.exports = {
    name: 'volume',
    description: 'Set music volume',
    args: true,
    usage: '<volume_level>',
    execute(message, args) {
      const serverQueue = queue.get(message.guild.id);
      var volumeLevel = args[0];

      if (!serverQueue) {
        console.log('nothing is playing');
        return message.channel.send('You are crazy, nothing is playing');
      }


      serverQueue.connection.dispatcher.setVolume(volumeLevel);
      return message.channel.send('Changed volume');
    },
};
