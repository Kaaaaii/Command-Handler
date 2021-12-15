"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const builders_1 = require("@discordjs/builders");
const collection_1 = __importDefault(require("@discordjs/collection"));
class CommandHandler {
    constructor(client) {
        this.commands = new collection_1.default();
        this.slash = [];
        this.privateSlash = [];
        this.client = client;
        if (!this.client.command_path)
            return;
        this.loadCommands().then(() => {
            this.listenCommands();
            if (!this.client.create_commands)
                return;
            this.client.once('ready', () => this.setCommands(this.client.test_guild));
        });
    }
    async loadCommands() {
        this.scanDir(this.client.command_path);
    }
    async scanDir(dir) {
        var command_dir;
        var directory = (0, fs_1.readdirSync)((0, path_1.join)(require.main.path, dir));
        for (const dirfile of directory) {
            if ((0, fs_1.lstatSync)((0, path_1.join)(require.main.path, dir + '/' + dirfile)).isDirectory()) {
                var commandBase = new builders_1.SlashCommandBuilder().setName(dirfile.split('.js')[0]).setDescription(' ');
                for (const dirfile2 of (0, fs_1.readdirSync)((0, path_1.join)(require.main.path, dir + '/' + dirfile))) {
                    var command = new (await Promise.resolve().then(() => __importStar(require((0, path_1.join)(require.main.path, dir + '/' + dirfile + '/' + dirfile2))))).default;
                    var command_dir = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + dirfile + '/' + command.name).replace(/\//g, '|').split('|');
                    command_dir.shift();
                    var command_dir = command_dir.join('|');
                    this.commands.set(command_dir, command);
                    if (command.global)
                        commandBase.addSubcommand(() => command.getBuilder());
                }
                this.slash.push(commandBase.toJSON());
            }
            else {
                var command = new (await Promise.resolve().then(() => __importStar(require((0, path_1.join)(require.main.path, dir + '/' + dirfile))))).default;
                var command_dir = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + command.name).replace(/\//g, '|').split('|');
                command_dir.shift();
                var command_dir = command_dir.join('|');
                this.commands.set(command_dir, command);
                if (command.global)
                    this.slash.push(command.getBuilder().toJSON());
            }
        }
    }
    async scanDirPrivate(data) {
        var commands = [];
        var command_dir;
        var dir = this.client.command_path;
        var directory = (0, fs_1.readdirSync)((0, path_1.join)(require.main.path, dir));
        for (const dirfile of directory) {
            if ((0, fs_1.lstatSync)((0, path_1.join)(require.main.path, dir + '/' + dirfile)).isDirectory()) {
                var commandBase = new builders_1.SlashCommandBuilder().setName(dirfile.split('.js')[0]).setDescription(' ');
                for (const dirfile2 of (0, fs_1.readdirSync)((0, path_1.join)(require.main.path, dir + '/' + dirfile))) {
                    var command = new (await Promise.resolve().then(() => __importStar(require((0, path_1.join)(require.main.path, dir + '/' + dirfile + '/' + dirfile2))))).default;
                    var command_dir = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + dirfile + '/' + command.name).replace(/\//g, '|').split('|');
                    command_dir.shift();
                    var command_dir = command_dir.join('|');
                    this.commands.set(command_dir, command);
                    commandBase.addSubcommand(() => command.getBuilder(data));
                }
                commands.push(commandBase.toJSON());
            }
            else {
                var command = new (await Promise.resolve().then(() => __importStar(require((0, path_1.join)(require.main.path, dir + '/' + dirfile))))).default;
                var command_dir = (dir.split(process.env.COMMANDS_PATH)[1] + '/' + command.name).replace(/\//g, '|').split('|');
                command_dir.shift();
                var command_dir = command_dir.join('|');
                this.commands.set(command_dir, command);
                commands.push(command.getBuilder(data).toJSON());
            }
        }
        return commands;
    }
    async setCommands(guild_id) {
        this.client.application.commands.set(this.slash, guild_id);
    }
    async listenCommands() {
        this.client.on('interactionCreate', async (interaction) => {
            if (interaction.isCommand()) {
                switch (interaction.options.data[0]?.type) {
                    case 'SUB_COMMAND':
                        var command = this.commands.get(interaction.commandName + '|' + interaction.options.getSubcommand());
                        command.id = interaction.commandName + '|' + interaction.options.getSubcommand();
                        break;
                    case 'SUB_COMMAND_GROUP':
                        var command = this.commands.get(interaction.options.getSubcommand() + '|' + interaction.options.getSubcommandGroup() + '|' + interaction.commandName);
                        command.id = interaction.options.getSubcommand() + '|' + interaction.options.getSubcommandGroup() + '|' + interaction.commandName;
                        break;
                    default:
                        var command = this.commands.get(interaction.commandName);
                        command.id = interaction.commandName;
                        break;
                }
                if (!command)
                    return this.client.error('Command Could not be found!');
                if (this.beforeCommandData) {
                    if (await this.beforeCommandData(interaction, command)) {
                        command.execute(interaction);
                    }
                }
                else {
                    command.execute(interaction);
                }
            }
        });
    }
    async registerCommands(guild_id, data) {
        var commands = await this.scanDirPrivate(data);
        this.client.application.commands.set(commands, guild_id);
    }
    beforeCommand(data) {
        this.beforeCommandData = data;
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.js.map