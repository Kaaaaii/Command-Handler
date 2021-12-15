import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Command } from "../../../src/index";

export default class extends Command {
    constructor() {
        super({
            name: "ban",
            description: "Ban a user from your realm.",
            global: false,
            metadata: {
                needs_permission: true,
                cooldown: 3
            }
        })
    }

    public getBuilder(data?: any) {
        const slash = this.getSubCommand()
        return slash
    }

    public execute(interaction: CommandInteraction): void {
        interaction.reply({ content: 'tee' })
    }
}