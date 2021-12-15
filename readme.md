# typescript-discordjs-bot-v13
Custom bot client that allows for easy creation of / commands, buttons, menus and events using typescript classes to interact with the discord api

## Setup

```TS
import { Intents } from "discord.js";
import { DiscordClient } from "../src/index";

const client = new DiscordClient({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],
    shards: 'auto',
    failIfNotExists: false
}, {
    command_path: '../commands',
    button_path: '../buttons',
    menu_path: '../menus',
    event_path: '../events',
    create_commands: true,
    test_guild: '866606673372119091'
})

client.login('TOKEN')
```

## Command

```TS
import { CommandInteraction, } from "discord.js";
import { Command } from "typescript-discordjs-bot-v13";

export default class extends Command {
    constructor() {
        super({
            name: "ping",
            description: "Ping, pong",
            global: true
        })
    }

    public getBuilder(data?: any) {
        const slash = this.getCommand()
        return slash
    }

    public execute(interaction: CommandInteraction): void {
        interaction.reply({ content: 'Pong' })
    }
}
```

## Event

```TS
import { Message, WebhookClient } from 'discord.js'
import { Event } from 'typescript-discordjs-bot-v13'

export default class extends Event {
    constructor() {
        super({
            event: 'messageCreate'
        })
    }

    async execute(message: Message) {
        console.log(message.content)
    }
}
```