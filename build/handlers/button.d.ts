import { DiscordClient } from '..';
declare class ButtonHandler {
    private client;
    private buttons;
    constructor(client: DiscordClient);
    private loadButtons;
    private scanDir;
    private listenButtons;
}
export { ButtonHandler };
