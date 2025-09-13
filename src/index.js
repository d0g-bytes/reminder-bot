import { ActivityType, Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, async (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);

  try {
    const commands = await readyClient.application.commands.fetch({
      guildId: process.env.GUILD_ID,
    });
    console.log(
      "Registered commands:",
      commands.map((c) => c.name)
    );

    readyClient.user.setPresence({
      status: "online",
      activities: [
        {
          name: "dunno",
          type: ActivityType.Playing,
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // /uwu-girl
  if (interaction.commandName === "uwu-girl") {
    await interaction.reply("UWU");
  }

  // /pinch
  if (interaction.commandName === "pinch") {
    const targetUser = interaction.options.getUser("target");
    await interaction.reply(`Pinching ${targetUser}!`);
  }
});

client.login(process.env.TOKEN);
