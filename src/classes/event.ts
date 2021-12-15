import { ClientEvents } from 'discord.js'

interface MenuOptions {
    event: string
}

export default class Event {

    public event: string

    constructor(options: MenuOptions) {
        this.event = options.event
    }

    public execute(...args): void { return null }
}

export { Event }