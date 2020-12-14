module.exports = client => {
  const channelCountID = '787716451933880360';

  const updateMembers = guild => {
    const channel = guild.channels.cache.get(channelCountID);
    // adds comma i.e 1300 -> 1,300
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  }

  client.on('guildMemberAdd', member => updateMembers(member.guild));
  client.on('guildMemberRemove', member => updateMembers(member.guild));

  // if bot is not on multiple servers
  // otherwise remove code below
  const guild = client.guilds.cache.get('741781347890364457');
  updateMembers(guild);
};
