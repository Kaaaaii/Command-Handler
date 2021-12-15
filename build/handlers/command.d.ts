import { DiscordClient } from '..';
declare class CommandHandler {
    private client;
    private commands;
    private slash;
    private privateSlash;
    private beforeCommandData;
    constructor(client: DiscordClient);
    private loadCommands;
    private scanDir;
    private scanDirPrivate;
    private setCommands;
    private listenCommands;
    registerCommands(guild_id: string, data: Object): Promise<void>;
    beforeCommand(data: Function): void;
}
export { CommandHandler };
