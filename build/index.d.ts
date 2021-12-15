import { Client, ClientOptions } from 'discord.js';
import { CommandHandler } from './handlers/command';
interface ToolConfig {
    command_path?: string;
    button_path?: string;
    menu_path?: string;
    events_path?: string;
    create_commands?: boolean;
    test_guild?: string;
    debug?: boolean;
}
declare class DiscordClient extends Client {
    command_path: string;
    button_path: string;
    menu_path: string;
    events_path: string;
    create_commands: boolean;
    test_guild: string;
    debug: boolean;
    command_handler: CommandHandler;
    constructor(options: ClientOptions, tools?: ToolConfig);
    private loggers;
    log(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    success(message?: any, ...optionalParams: any[]): void;
    logdeBug(message?: any, ...optionalParams: any[]): void;
}
import { Command } from './classes/command';
import { Button } from './classes/button';
import { Menu } from './classes/menu';
import { Event } from './classes/event';
export { DiscordClient, Command, Button, Menu, Event };
