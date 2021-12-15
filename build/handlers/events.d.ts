import { DiscordClient } from '..';
declare class EventHandler {
    private client;
    private events;
    constructor(client: DiscordClient);
    private loadEvents;
    private scanDir;
}
export { EventHandler };
