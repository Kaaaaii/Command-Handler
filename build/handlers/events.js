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
exports.EventHandler = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const collection_1 = __importDefault(require("@discordjs/collection"));
class EventHandler {
    constructor(client) {
        this.events = new collection_1.default();
        this.client = client;
        if (!this.client.events_path)
            return;
        this.loadEvents();
    }
    async loadEvents() {
        this.scanDir(this.client.events_path);
    }
    async scanDir(dir) {
        var directory = (0, fs_1.readdirSync)((0, path_1.join)(require.main.path, dir));
        for (const dirfile of directory) {
            this.createEvent(dir, dirfile);
        }
    }
    async createEvent(dir, file) {
        var event = new (await Promise.resolve().then(() => __importStar(require((0, path_1.join)(require.main.path, dir + '/' + file))))).default;
        this.client.on(event.event, (...args) => event.execute(...args));
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=events.js.map