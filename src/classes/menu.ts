import { SelectMenuInteraction } from "discord.js"

interface MenuOptions {
    id: string
}

export default class Menu {

    public id: string

    constructor(options: MenuOptions) {
        this.id = options.id
    }

    public execute(interaction: SelectMenuInteraction, data: String | Object | any[]): void { return null }
}

export { Menu }