import { CommandInteraction, Intents } from "discord.js";
import { Command, DiscordClient } from "../src/index";

const client = new DiscordClient({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
    shards: 'auto',
    failIfNotExists: false
}, {
    command_path: '../tests/commands',
    create_commands: true,
    test_guild: '866606673372119091'
})

client.login('TOKEN')