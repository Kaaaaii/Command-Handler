interface MenuOptions {
    event: string;
}
export default class Event {
    event: string;
    constructor(options: MenuOptions);
    execute(...args: any[]): void;
}
export { Event };
