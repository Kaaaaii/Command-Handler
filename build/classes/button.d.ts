import { ButtonInteraction } from "discord.js";
interface ButtonOptions {
    id: string;
}
export default class Button {
    id: string;
    constructor(options: ButtonOptions);
    execute(interaction: ButtonInteraction, data: String | Object | any[]): void;
}
export { Button };
