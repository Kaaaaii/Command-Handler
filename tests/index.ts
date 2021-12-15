import { CommandInteraction, Intents } from "discord.js";
import { DiscordClient } from "../src/index";

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

client.command_handler.beforeCommand(async (interaction: CommandInteraction) => {
    if(interaction.channelId == '920385333940613130') {
        return true
    } else {
        await interaction.reply({ content: 'not this channel' })
        return false
    }
})

client.login('TOKEN')