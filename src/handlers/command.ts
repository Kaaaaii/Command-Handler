import { join } from 'path';
import { lstatSync, readdirSync } from 'fs';
import { SlashCommandBuilder } from '@discordjs/builders'
import { DiscordClient } from '..';
import { Command } from '../classes/command'
import Collection from '@discordjs/collection';

class CommandHandler {

    private client: DiscordClient;
    private commands: Collection<string, any> = new Collection();
    private slash: Array<any> = [];
    private privateSlash: Array<any> = [];
    private beforeCommandData: Function;

    constructor(client: DiscordClient) {
        this.client = client;
        if (!this.client.command_path) return
        this.loadCommands().then(() => {
            this.listenCommands()
            if (!this.client.create_commands) return
            this.client.once('ready', () => this.setCommands(this.client.test_guild))
        })
    }

    private async loadCommands() {
        this.scanDir(this.client.command_path)
    }

    private async scanDir(dir: string) {
        var command_dir: any;
        var directory = readdirSync(join(require.main.path, dir))
        for (const dirfile of directory) {
            if (lstatSync(join(require.main.path, dir + '/' + dirfile)).isDirectory()) {
                var commandBase = new SlashCommandBuilder().setName(dirfile.split('.js')[0]).setDescription(' ')
                for (const dirfile2 of readdirSync(join(require.main.path, dir + '/' + dirfile))) {
                    var command: Command = new (await import(join(require.main.path, dir + '/' + dirfile + '/' + dirfile2))).default
                    var command_dir: any = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + dirfile + '/' + command.name).replace(/\//g, '|').split('|'); command_dir.shift(); var command_dir = command_dir.join('|')
                    this.commands.set(command_dir, command)
                    commandBase.addSubcommand(() => command.getBuilder() as any)
                }
                if(command.global) this.slash.push(commandBase.toJSON())
            } else {
                var command: Command = new (await import(join(require.main.path, dir + '/' + dirfile))).default
                var command_dir: any = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + command.name).replace(/\//g, '|').split('|'); command_dir.shift(); var command_dir = command_dir.join('|')
                this.commands.set(command_dir, command)
                if(command.global) this.slash.push(command.getBuilder().toJSON())
            }
        }
    }

    private async scanDirPrivate(data: Object) {
        var commands: any[] = []
        var command_dir: any;
        var dir: any = this.client.command_path
        var directory = readdirSync(join(require.main.path, dir))
        for (const dirfile of directory) {
            if (lstatSync(join(require.main.path, dir + '/' + dirfile)).isDirectory()) {
                var commandBase = new SlashCommandBuilder().setName(dirfile.split('.js')[0]).setDescription(' ')
                for (const dirfile2 of readdirSync(join(require.main.path, dir + '/' + dirfile))) {
                    var command: Command = new (await import(join(require.main.path, dir + '/' + dirfile + '/' + dirfile2))).default
                    var command_dir: any = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + dirfile + '/' + command.name).replace(/\//g, '|').split('|'); command_dir.shift(); var command_dir = command_dir.join('|')
                    this.commands.set(command_dir, command)
                    commandBase.addSubcommand(() => command.getBuilder(data) as any)
                }
                commands.push(commandBase.toJSON())
            } else {
                var command: Command = new (await import(join(require.main.path, dir + '/' + dirfile))).default
                var command_dir: any = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + command.name).replace(/\//g, '|').split('|'); command_dir.shift(); var command_dir = command_dir.join('|')
                this.commands.set(command_dir, command)
                commands.push(command.getBuilder(data).toJSON())
            }
        }
        return commands
    }

    private async setCommands(guild_id?: string) {
        this.client.application.commands.set(this.slash, guild_id)
    }

    private async listenCommands() {
        this.client.on('interactionCreate', async(interaction) => {
            if (interaction.isCommand()) {
                switch (interaction.options.data[0]?.type) {
                    case 'SUB_COMMAND':
                        var command = this.commands.get(interaction.commandName + '|' + interaction.options.getSubcommand())
                        command.id = interaction.commandName + '|' + interaction.options.getSubcommand()
                        break;
                    case 'SUB_COMMAND_GROUP':
                        var command = this.commands.get(interaction.options.getSubcommand() + '|' + interaction.options.getSubcommandGroup() + '|' + interaction.commandName)
                        command.id = interaction.options.getSubcommand() + '|' + interaction.options.getSubcommandGroup() + '|' + interaction.commandName
                        break;
                    default:
                        var command = this.commands.get(interaction.commandName)
                        command.id = interaction.commandName
                        break;
                }
                if(!command) return this.client.error('Command Could not be found!')
                if(this.beforeCommandData) {
                    if(await this.beforeCommandData(interaction, command)) {
                        command.execute(interaction)
                    }
                } else {
                    command.execute(interaction)
                }
            }
        })
    }

    public async registerCommands(guild_id: string, data: Object) {
        var commands = await this.scanDirPrivate(data)
        this.client.application.commands.set(commands, guild_id)
    }

    public beforeCommand(data: Function) {
        this.beforeCommandData = data
    }
}

export { CommandHandler }