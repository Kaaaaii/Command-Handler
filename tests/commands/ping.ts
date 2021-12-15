import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Command } from "../../src/index";

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