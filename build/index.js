"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.Menu = exports.Button = exports.Command = exports.DiscordClient = void 0;
const discord_js_1 = require("discord.js");
const safe_1 = __importDefault(require("colors/safe"));
const command_1 = require("./handlers/command");
class DiscordClient extends discord_js_1.Client {
    constructor(options, tools) {
        super(options);
        this.command_path = tools.command_path;
        this.button_path = tools.button_path;
        this.menu_path = tools.menu_path;
        this.events_path = tools.events_path;
        this.create_commands = tools.create_commands;
        this.test_guild = tools.test_guild;
        this.debug = tools.debug || false;
        this.loggers();
        this.command_handler = new command_1.CommandHandler(this);
        new button_2.ButtonHandler(this);
        new menu_2.MenuHandler(this);
        new events_1.EventHandler(this);
    }
    loggers() {
        this.on('ready', () => this.success('Client Logged in as ' + this.user.tag));
        this.on('error', (err) => this.error(err));
        this.on('invalidRequestWarning', (request) => this.warn(request));
        this.on('rateLimit', (rateLimitInfo) => this.warn('Rate Limit Reached: ' + rateLimitInfo.route));
    }
    log(message, ...optionalParams) {
        console.log(safe_1.default.gray('[LOG] ') + message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        console.log(safe_1.default.red('[ERROR] ') + message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        console.log(safe_1.default.yellow('[WARNING] ') + message, ...optionalParams);
    }
    success(message, ...optionalParams) {
        console.log(safe_1.default.green('[SUCCESS] ') + message, ...optionalParams);
    }
    logdeBug(message, ...optionalParams) {
        console.log(safe_1.default.gray('[DEBUG] ') + message, ...optionalParams);
    }
}
exports.DiscordClient = DiscordClient;
const command_2 = require("./classes/command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_2.Command; } });
const button_1 = require("./classes/button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return button_1.Button; } });
const menu_1 = require("./classes/menu");
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return menu_1.Menu; } });
const event_1 = require("./classes/event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return event_1.Event; } });
const button_2 = require("./handlers/button");
const menu_2 = require("./handlers/menu");
const events_1 = require("./handlers/events");
//# sourceMappingURL=index.js.map