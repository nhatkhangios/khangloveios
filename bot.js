const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

client.once(Events.ClientReady, () => {
  console.log(`${client.user.tag} online`);
});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "menu") {

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("MỞ MENU")
        .setStyle(ButtonStyle.Link)
        .setURL("https://raw.githack.com/khanglovetiktok123-eng/key/main/index.html")
    );

    await interaction.reply({
      content: "nhat khang ios",
      components: [row]
    });
  }
});

client.login(TOKEN);