import { DiscordClient } from '..';
declare class MenuHandler {
    private client;
    private menus;
    constructor(client: DiscordClient);
    private loadMenus;
    private scanDir;
    private listenMenus;
}
export { MenuHandler };
