import { join } from 'path';
import { lstatSync, readdirSync } from 'fs';
import { DiscordClient } from '..';
import { Button } from '../classes/button'
import Collection from '@discordjs/collection';

class ButtonHandler {

    private client: DiscordClient;
    private buttons: Collection<string, any> = new Collection();

    constructor(client: DiscordClient) {
        this.client = client;
        if (!this.client.button_path) return
        this.loadButtons()
        this.listenButtons()
    }

    private async loadButtons() {
        this.scanDir(this.client.button_path)
    }

    private async scanDir(dir: string) {
        var directory = readdirSync(join(require.main.path, dir))
        for (const dirfile of directory) {
            var button: Button = new (await import(join(require.main.path, dir + '/' + dirfile))).default
            this.buttons.set(button.id, button)
        }
    }

    private async listenButtons() {
        this.client.on('interactionCreate', (interaction) => {
            if (interaction.isButton()) {
                var interactionData = JSON.parse(interaction.customId)
                this.buttons.get(interactionData.i)
                    .execute(interaction, interactionData.d)
            }
        })
    }
}

export { ButtonHandler }