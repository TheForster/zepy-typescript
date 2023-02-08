import { ExtendedClient } from '../structures/Client';
import { Event } from '../structures/Event';
import { ExtendedInteraction } from '../typings/Command';

export default new Event(
    {
        name: 'interactionCreate',
    },
    interaction => {
        if (interaction.isChatInputCommand()) {
            const command = (interaction.client as ExtendedClient).commands.get(interaction.commandName);
            if (!command) return;

            try {
                command.run({
                    interaction: interaction as ExtendedInteraction,
                    client: interaction.client as ExtendedClient,
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
);
