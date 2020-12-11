const ytdl = require('ytdl-core');

// maintain server queues
// don't want global queue across servers
const queue = new Map();

module.exports = {
    name: 'play',
    description: 'Play your favorite music',
    args: true,
    usage: '<url>',
    aliases: ['music', 'song'],
    execute(message, args) {
      const serverQueue = queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;

      const song = {
        url: args[0],
      }

      if (!serverQueue) {
        console.log('queue is undefined');
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        }
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        console.log(queueConstruct.songs[0]);

        try {

          console.log('trying connection');

          voiceChannel.join().then(connection => {


            // console.log(connection);

            queueConstruct.connection = connection;
            // console.log(queueConstruct.connection);
            play(message.guild.id, queueConstruct.songs[0]);
            // const serverQueue = queue.get(message.guild.id);
            // var song = queueConstruct.songs[0];
            //
            // if (!song) {
            //   serverQueue.voiceChannel.leave();
            //   queue.delete(message.guild.id);
            //   return;
            // }
            //
            // const stream = ytdl(song.url, { filter: 'audioonly' });
            // const dispatcher = serverQueue.connection.play(stream, {
            //   volume: 0.5,
            // });
            //
            // dispatcher.on('finish', () => {
            //   serverQueue.songs.shift();
            //   var song = queueConstruct.songs[0];
            //
            //   console.log(song.url);
            //
            //   if (!serverQueue) {
            //     voiceChannel.leave();
            //   } else {
            //     console.log('playing new song');
            //
            //     // issue bot does not leave when theres multiple songs
            //
            //     if (!song) {
            //       serverQueue.voiceChannel.leave();
            //       queue.delete(message.guild.id);
            //       return;
            //     }
            //
            //     const stream = ytdl(song.url, { filter: 'audioonly' });
            //     const dispatcher = serverQueue.connection.play(stream, {
            //       volume: 0.5,
            //     });
            //   }
            // });
            //
            // dispatcher.on('error', console.error);
          })
        } catch (error) {
          console.log('Error connecting to voice channel');
          queue.delete(message.guild.id);
          return message.channel.send('Error connecting to voice channel');
        }
      } else {
        serverQueue.songs.push(song);
        console.log('song added to queue');
        return message.channel.send('Added song to queue');
      }

      message.channel.send('Play some funky music!');

      // if (!message.guild.voiceConnection) {
      //   message.member.voice.channel.join().then(connection => {
      //     const stream = ytdl(url, { filter: 'audioonly' });
      //     const dispatcher = connection.play(stream, {
      //       volume: 0.5,
      //     });
      //
      //     dispatcher.on('finish', () => {
      //         message.member.voice.channel.leave();
      //       }
      //     );
      //
      //     dispatcher.on('error', console.error);
      //   })
      // }
    },
};

function play(guild, song) {
  const serverQueue = queue.get(guild);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild);
    return;
  }

  const stream = ytdl(song.url, { filter: 'audioonly' });
  const dispatcher = serverQueue.connection.play(stream, {
    volume: 0.5,
  });

  dispatcher.on('finish', () => {
    serverQueue.songs.shift();
    play(guild, serverQueue.songs[0]);
  });

  dispatcher.on('error', console.error);
}
