const { Channel } = require('diagnostics_channel');
const { Discord, Permissions, MessageEmbed, ChannelType } = require('discord.js');
const { readdirSync } = require('fs');
const commandFiles = readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    let client = interaction.client;
    if (!interaction.type == 2) return;
    if (interaction.user.bot) return;
    if (interaction.channel.type === ChannelType.DM) return;

    for (const file of commandFiles) {
      const command = require(`../../src/commands/${file}`);
      if (interaction.commandName === command.data.name) {
        command.run(client, interaction);
      }
    }
  },
};
