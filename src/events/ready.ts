import { ExtendedClient } from '../structures/Client';
import { Event } from '../structures/Event';

export default new Event(
    {
        name: 'ready',
    },
    client => {
        console.log(`[💙]: Logged in as ${client.user.tag}`);
        (client as ExtendedClient).registerCommands({ guildId: process.env.ClientGuildId as string });
    }
);
