module.exports = {
    name: 'nickname',
    description: 'Change your nickname',
    args: true,
    usage: '<nickname>',
    aliases: ['newname', 'changename', 'name'],
    execute(message, args) {
        const member = message.member;
        const nickName = message.content.match(/\b(?!name|changename|newname|nickname\b)\S[^~,]*/)[0];

        member.setNickname(nickName);
    },
};
