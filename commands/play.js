const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play your favorite music',
    args: true,
    usage: '<url>',
    aliases: ['music', 'song'],
    execute(message, args) {

      var url = args[0];

      message.channel.send('Play some funky music!');

      message.member.voice.channel.join().then(connection => {
        const stream = ytdl(url, { filter: 'audioonly' });
        const dispatcher = connection.play(stream);

        dispatcher.on('finish', () => message.member.voice.channel.leave());
      })
    },
};
