module.exports = client => {
  const welcomeID = '788098455012114434';

  // const welcomeMembers = guild => {
  //   const channel = guild.channels.cache.get(welcomeID);
  //   // adds comma i.e 1300 -> 1,300
  //   channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  // }

  const welcomeMember = member => {
    const channel = member.guild.channels.cache.get(welcomeID);
    channel.send(`We are honored that you joined us, ${member.displayName}`);
  }



  client.on('guildMemberAdd', member => welcomeMember(member));
};
