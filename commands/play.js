const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

// maintain server queues
// don't want global queue across servers
global.queue = new Map();

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

      const options = {
        pages: 1,
      }

      async function search() {
        let searchResponse = await ytsr('star wars', options)
        .catch(error => { throw error });

        return searchResponse;
      }


      var myResponse = search();

      console.log(myResponse);

      var myResponse = search()
          .then(response => return response.items)
          .catch(error => console.log(error));



      return;
      // if (!ytdl.validateURL(args[0])) {
      //   console.log('invalid url');
      //   return;
      // }

      try {
        var videoID = ytdl.getURLVideoID(args[0]);
        console.log(videoID);

        if (!ytdl.validateID(videoID)) {
          console.log('invalid video id format');
          return message.channel.send('Invalid YouTube video id');
        }
      } catch (error) {
        console.log(error);
        return message.channel.send(`Could not find YouTube video id`);
      }

      if (!voiceChannel) {
        console.log('not in voice channel');
        return message.channel.send(`${message.author}, chief, you're not in a voice channel.\nWhat am I supposed to join?`);
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

            queueConstruct.connection = connection;
            play(message.guild.id, queueConstruct.songs[0]);

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

  dispatcher.on('error', error => {
    console.log(error);
    serverQueue.songs.shift();

    if (serverQueue.songs) {
      console.log('still have songs in the queue');
      play(guild, serverQueue.songs[0]);
      return serverQueue.textChannel.send(`${error}`);
    }

    return serverQueue.textChannel.send(`${error}`);
  });
}
