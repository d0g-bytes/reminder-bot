import { REST, Routes } from "discord.js";
import "dotenv/config";

import { SlashCommandBuilder } from "discord.js";

const commands = [
  new SlashCommandBuilder().setName("uwu-girl").setDescription("uwu").toJSON(),

  new SlashCommandBuilder()
    .setName("pinch")
    .setDescription("OWO")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to ping")
        .setRequired(true)
    )
    .toJSON(),
];

export default commands;

const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
console.log(GUILD_ID);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, GUILD_ID),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
