"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const builders_1 = require("@discordjs/builders");
class Command {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.global = options.global || true;
        this.metadata = options.metadata || {};
    }
    getSubCommand() {
        return new builders_1.SlashCommandSubcommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    getCommand() {
        return new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    getBuilder(data) { return null; }
    execute(interaction) { return null; }
}
exports.default = Command;
exports.Command = Command;
//# sourceMappingURL=command.js.map