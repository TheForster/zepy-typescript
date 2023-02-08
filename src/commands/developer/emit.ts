import { Command } from '../../structures/Command';
import { ApplicationCommandOptionType, CommandInteractionOptionResolver, Events } from 'discord.js';

export default new Command({
    data: {
        name: 'emit',
        description: 'client event emitter',
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: 'id',
                description: 'Event Identity',
                required: true,
            },
        ],
    },
    config: { guildOnly: true },
    run: ({ interaction, client }) => {
        const eventId = (interaction.options as CommandInteractionOptionResolver).getString('id') as string;
        if (eventId in Events) {
            client.emit(eventId, eventId in Events);
        } else return interaction.reply(`Cannot find ${eventId} in events.`);
    },
});
