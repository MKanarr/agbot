module.exports = {
    name: 'magic8ball',
    description: 'Hear your fortune',
    args: true,
    usage: '<fortune>',
    aliases: ['8ball', 'fortune'],
    execute(message, args) {
      const answers = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes – definitely.',
        'You may rely on it. ',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
      ];

      const fortune = args.slice(0).join(' ');

      var num = randomNums();

      console.log(num);

      return message.channel.send(`${message.author}, ${answers[num]}`);
    },
};

function randomNums() {
  min = Math.ceil(0);
  max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
