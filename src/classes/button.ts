import { ButtonInteraction } from "discord.js"

interface ButtonOptions {
    id: string
}

export default class Button {

    public id: string

    constructor(options: ButtonOptions) {
        this.id = options.id
    }

    public execute(interaction: ButtonInteraction, data: String | Object | any[]): void { return null }
}

export { Button }