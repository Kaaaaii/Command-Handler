import { SelectMenuInteraction } from "discord.js";
interface MenuOptions {
    id: string;
}
export default class Menu {
    id: string;
    constructor(options: MenuOptions);
    execute(interaction: SelectMenuInteraction, data: String | Object | any[]): void;
}
export { Menu };
