import { ActivityType, Client, ClientEvents, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { CommandType } from '../typings/Command';
import { Event } from './Event';
import { RegisterCommandsOptions } from '../typings/RegisterCommands';

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds],
            shards: 'auto',
            allowedMentions: { repliedUser: false, parse: ['roles', 'users'] },
            presence: { status: 'idle', activities: [{ name: '💙 TypeScript', type: ActivityType.Playing }] },
        });
    }

    start() {
        this.registerModules();
        this.login(process.env.ClientToken);
    }

    async registerCommands({ guildId }: RegisterCommandsOptions) {
        const [privateGuildOnlyCommands, publicCommands] = this.commands.partition(cmd => cmd.config.guildOnly);
        const guild = this.guilds.cache.get(guildId);

        if (privateGuildOnlyCommands.size > 0)
            guild?.commands
                .set(privateGuildOnlyCommands.map(cmd => cmd.data))
                .then(savedCmds => console.log(`[💚]: ${savedCmds.size} commands saved to "${guild.name}" server.`));
        if (publicCommands.size > 0)
            this.application?.commands
                .set(publicCommands.map(cmd => cmd.data))
                .then(savedCmds => console.log(`[💚]: ${savedCmds.size} commands saved to application.`));
    }

    async registerModules() {
        // * Commands
        const cmdPath = `${__dirname}/../commands`;
        readdirSync(cmdPath).forEach(async directory => {
            for (const file of readdirSync(`${cmdPath}/${directory}`).filter(file => file.endsWith('.ts'))) {
                const command: CommandType = await import(`../commands/${directory}/${file}`).then(m => m.default);
                this.commands.set(command.data.name, command);
            }
        });

        // * Events
        const eventPath = `${__dirname}/../events`;
        for (const file of readdirSync(eventPath).filter(file => file.endsWith('.ts'))) {
            const event: Event<keyof ClientEvents> = await import(`../events/${file}`).then(m => m.default);
            if (!event.config.name) return;
            else if (event.config.disabled) return console.log(`[💛]: ${event.config.name} is disabled!`);

            if (event.config.once) this.once(event.config.name, event.run);
            else this.on(event.config.name, event.run);
        }
    }
}
