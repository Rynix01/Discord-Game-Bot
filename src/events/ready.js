const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    let activities = [`Youtube`, `YoutubeDev`, `Poker`, `Betrayal`, `Fishing`, `Chess`, `ChessDev`],
      i = 0;
    setInterval(
      () =>
        client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: ActivityType.Playing,
        }),
      22000,
    );
  },
};
