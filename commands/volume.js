module.exports = {
    name: 'volume',
    description: 'Set music volume',
    args: true,
    usage: '<volume_level>',
    execute(message, args) {
      const voiceChannel = message.member.voice.channel;
      const serverQueue = queue.get(message.guild.id);
      var volumeLevel = args[0];

      if (!voiceChannel) {
        console.log('not in voice channel');
        return message.channel.send(`${message.author}, chief, you're not in a voice channel.\nWhat am I supposed to do?`);
      }

      if (!serverQueue) {
        console.log('nothing is playing');
        return message.channel.send('You are crazy, nothing is playing');
      }

      if (volumeLevel < 0 || volumeLevel > 2) {
        console.log('exceeds volume range');
        return message.channel.send(`${message.author}, are you crazy?\nHere's the rules, chief -> 0 <= volumeLevel <= 2\n 0 (muted), 2 (blow your ears out)`);
      }

      serverQueue.connection.dispatcher.setVolume(volumeLevel);
      return message.channel.send('Changed volume');
    },
};
