import { join } from 'path';
import { lstatSync, readdirSync } from 'fs';
import { DiscordClient } from '..';
import { Button } from '../classes/button'
import Collection from '@discordjs/collection';
import Event from '../classes/event';

class EventHandler {

    private client: DiscordClient;
    private events: Collection<string, any> = new Collection();

    constructor(client: DiscordClient) {
        this.client = client;
        if (!this.client.events_path) return
        this.loadEvents()
    }

    private async loadEvents() {
        this.scanDir(this.client.events_path)
    }

    private async scanDir(dir: string) {
        var directory = readdirSync(join(require.main.path, dir))
        for (const dirfile of directory) {
            var event: Event = new (await import(join(require.main.path, dir + '/' + dirfile))).default
            this.client.on(event.event, (...args) => event.execute(...args))
        }
    }

    private async createEvent(dir, file) {
        var event: Event = new (await import(join(require.main.path, dir + '/' + file))).default
        this.client.on(event.event, (...args) => event.execute(...args))
    }
}

export { EventHandler }