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
exports.MenuHandler = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const collection_1 = __importDefault(require("@discordjs/collection"));
class MenuHandler {
    constructor(client) {
        this.menus = new collection_1.default();
        this.client = client;
        if (!this.client.menu_path)
            return;
        this.loadMenus();
        this.listenMenus();
    }
    async loadMenus() {
        this.scanDir(this.client.menu_path);
    }
    async scanDir(dir) {
        var directory = (0, fs_1.readdirSync)((0, path_1.join)(require.main.path, dir));
        for (const dirfile of directory) {
            var menu = new (await Promise.resolve().then(() => __importStar(require((0, path_1.join)(require.main.path, dir + '/' + dirfile))))).default;
            this.menus.set(menu.id, menu);
        }
    }
    async listenMenus() {
        this.client.on('interactionCreate', (interaction) => {
            if (interaction.isSelectMenu()) {
                var interactionData = JSON.parse(interaction.customId);
                this.menus.get(interactionData.i)
                    .execute(interaction, interactionData.d);
            }
        });
    }
}
exports.MenuHandler = MenuHandler;
//# sourceMappingURL=menu.js.map