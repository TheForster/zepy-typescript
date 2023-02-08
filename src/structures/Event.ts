import { ClientEvents } from 'discord.js';

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public config: {
            name: Key;
            once?: boolean;
            disabled?: boolean;
        },
        public run: (...args: ClientEvents[Key]) => any
    ) {}
}
