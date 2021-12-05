import { join } from 'path';
import { lstatSync, readdirSync } from 'fs';
import { DiscordClient } from '..';
import { Menu } from '../classes/menu'
import Collection from '@discordjs/collection';

class MenuHandler {

    private client: DiscordClient;
    private menus: Collection<string, any> = new Collection();

    constructor(client: DiscordClient) {
        this.client = client;
        if (!this.client.menu_path) return
        this.loadMenus()
        this.listenMenus()
    }

    private async loadMenus() {
        this.scanDir(this.client.menu_path)
    }

    private async scanDir(dir: string) {
        console.log(join(require.main.path, dir))
        var directory = readdirSync(join(require.main.path, dir))
        for (const dirfile of directory) {
            var menu: Menu = new (await import(join(require.main.path, dir + '/' + dirfile))).default
            this.menus.set(menu.id, menu)
        }
    }

    private async listenMenus() {
        this.client.on('interactionCreate', (interaction) => {
            if (interaction.isSelectMenu()) {
                var interactionData = JSON.parse(interaction.customId)
                this.menus.get(interactionData.i)
                    .execute(interaction, interactionData.d)
            }
        })
    }
}

export { MenuHandler }