module.exports = {
    name: 'pause',
    description: 'Pause songs',
    args: false,
    execute(message, args) {
      const serverQueue = queue.get(message.guild.id);

      if (!serverQueue) {
        console.log('nothing is playing');
        return message.channel.send('You are crazy, nothing is playing');
      }

      if (!serverQueue.playing) {
        return message.channel.send('It\'s paused gosh darn it');
      }

      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);
      console.log(serverQueue.playing);
      return message.channel.send('Paused song');
    },
};
