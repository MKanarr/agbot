module.exports = {
    name: 'resume',
    description: 'Resume songs',
    args: false,
    execute(message, args) {
      const serverQueue = queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;

      if (!voiceChannel) {
        console.log('not in voice channel');
        return message.channel.send(`${message.author}, chief, you're not in a voice channel.\nWhat am I supposed to do?`);
      }

      if (!serverQueue) {
        console.log('nothing is playing');
        return message.channel.send('You are crazy, nothing is playing');
      }

      if (serverQueue.playing) {
        return message.channel.send('It\'s already playing gosh darn it');
      }

      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      console.log(serverQueue.playing);
      return message.channel.send('Resumed song');
    },
};
