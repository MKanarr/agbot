module.exports = {
    name: 'stop',
    description: 'Stop playing music',
    args: false,
    aliases: ['done', 'pls_stop'],
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

      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      return message.channel.send('Stopped music');
    },
};
