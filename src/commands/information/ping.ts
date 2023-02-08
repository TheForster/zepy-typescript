import { Command } from '../../structures/Command';

export default new Command({
    data: {
        name: 'ping',
        description: 'replies with pong!',
    },
    config: {
        guildOnly: false,
    },
    run: ({ interaction }) => {
        interaction.reply({ content: 'Pong!' });
    },
});
