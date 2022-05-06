import { Client, ClientOptions } from 'discord.js';
import colors from 'colors/safe'

import { CommandHandler } from './handlers/command';

interface ToolConfig {
    command_path?: string;
    button_path?: string;
    menu_path?: string;
    events_path?: string;
    create_commands?: boolean;
    test_guild?: string;
    debug?: boolean;
    messages?: Messages
}

interface Messages {
    command_not_found?: string;
    command_error?: string;
    invalid_permissions?: string;
}

class DiscordClient extends Client {

    public command_path: string;
    public button_path: string;
    public menu_path: string;
    public events_path: string;
    public create_commands: boolean;
    public test_guild: string;
    public debug: boolean;
    public messages: Messages

    public command_handler: CommandHandler

    constructor(options: ClientOptions, tools?: ToolConfig) {
        super(options);
        this.command_path = tools.command_path;
        this.button_path = tools.button_path;
        this.menu_path = tools.menu_path;
        this.events_path = tools.events_path;
        this.create_commands = tools.create_commands;
        this.test_guild = tools.test_guild;
        this.debug = tools.debug || false;
        this.messages = {
            command_error: tools.messages.command_error || 'An error occured while executing this command.',
            command_not_found: tools.messages.command_not_found || 'Command not found.',
            invalid_permissions: tools.messages.invalid_permissions || 'You do not have the required permissions to execute this command.'
        };

        this.loggers()

        this.command_handler = new CommandHandler(this)
        new ButtonHandler(this)
        new MenuHandler(this)
        new EventHandler(this)
    }

    private loggers() {
        this.on('ready', () => this.success('Client Logged in as ' + this.user.tag))
        this.on('error', (err) => this.error(err))
        this.on('invalidRequestWarning', (request) => this.warn(request))
        this.on('rateLimit', (rateLimitInfo) => this.warn('Rate Limit Reached: ' + rateLimitInfo.route))
    }

    public log(message?: any, ...optionalParams: any[]) {
        console.log(colors.gray('[LOG] ') + message, ...optionalParams);
    }

    public error(message?: any, ...optionalParams: any[]) {
        console.log(colors.red('[ERROR] ') + message, ...optionalParams);
    }

    public warn(message?: any, ...optionalParams: any[]) {
        console.log(colors.yellow('[WARNING] ') + message, ...optionalParams);
    }

    public success(message?: any, ...optionalParams: any[]) {
        console.log(colors.green('[SUCCESS] ') + message, ...optionalParams);
    }

    public logdeBug(message?: any, ...optionalParams: any[]) {
        console.log(colors.gray('[DEBUG] ') + message, ...optionalParams);
    }
}

import { Command } from './classes/command';
import { Button } from './classes/button';
import { Menu } from './classes/menu'
import { Event } from './classes/event'

import { ButtonHandler } from './handlers/button';
import { MenuHandler } from './handlers/menu';
import { EventHandler } from './handlers/events';

export { DiscordClient, Command, Button, Menu, Event };