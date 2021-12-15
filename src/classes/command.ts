import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders"
import { CommandInteraction } from "discord.js"
import { DiscordClient } from ".."

interface CommandOptions {
    name: string
    description: string,
    global?: boolean
}

export default class Command {

    public name: string
    public description: string
    public global: boolean

    constructor(options: CommandOptions) {
        this.name = options.name
        this.description = options.description
        this.global = options.global || true
    }

    protected getSubCommand(): SlashCommandSubcommandBuilder {
        return new SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }

    protected getCommand(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }

    public getBuilder(data?: any): SlashCommandBuilder | SlashCommandSubcommandBuilder { return null }
    public execute(interaction: CommandInteraction): void { return null }
}

export { Command }