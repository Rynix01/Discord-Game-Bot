const {
  Discord,
  MessageEmbed,
  Permissions,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
  Colors,
} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Start a game')
    .addStringOption((option) =>
      option
        .setName('select')
        .setDescription('Enter a string')
        .setRequired(true)
        .addChoices(
          { name: 'youtube', value: 'youtube' },
          { name: 'youtubedev', value: 'youtubedev' },
          { name: 'poker', value: 'poker' },
          { name: 'betrayal', value: 'betrayal' },
          { name: 'fishing', value: 'fishing' },
          { name: 'chess', value: 'chess' },
          { name: 'chessdev', value: 'chessdev' },
          { name: 'lettertile', value: 'lettertile' },
          { name: 'wordsnack', value: 'wordsnack' },
          { name: 'doodlecrew', value: 'doodlecrew' },
          { name: 'awkword', value: 'awkword' },
          { name: 'spellcast', value: 'spellcast' },
          { name: 'checkers', value: 'checkers' },
          { name: 'puttparty', value: 'puttparty' },
          { name: 'sketchheads', value: 'sketchheads' },
          { name: 'ocho', value: 'ocho' },
        ),
    ),
  run: async (client, interaction) => {
    if (!interaction.member.voice.channel) return interaction.reply('You must join an audio channel');
    if (interaction.member.voice.channel) {
      const game = interaction.options.getString('select');
      client.discordTogether
        .createTogetherCode(interaction.member.voice.channel.id, game)
        .catch(() => {
          interaction.reply('there is no such game');
        })
        .then(async (invite) => {
          const embed = new EmbedBuilder()
            .setAuthor({
              name: '👋 Hi bro',
              iconURL: interaction.user.avatarURL({ dynamic: true }),
            })
            .setDescription(
              `This bot is an open source bot, you can join the game from the links below and access the source code of the bot.`,
            )
            .addFields({
              name: '‏‏‏‏‏‏‏‏   ',
              value: `[Join the Game](${invite.code}) | [Source Code](https://github.com/Rynix01/Discord-Game-Bot)`,
            })
            .setFooter({
              text: `Good uses`,
            })
            .setColor(Colors.Blurple);
          return interaction.reply({ embeds: [embed] }); // Click the blue link !
        });
    }
  },
};
