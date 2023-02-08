/**
 * * Template
 * data: {
 * name: string
 * description: string,
 * run: async ({ ...args }) => {}
 * }
 */

import type { ChatInputApplicationCommandData, CommandInteraction, GuildMember } from 'discord.js';
import { ExtendedClient } from '../structures/Client';

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

export type CommandType = {
    data: ChatInputApplicationCommandData;
    config: { guildOnly: boolean };
    run: (options: { interaction: ExtendedInteraction; client: ExtendedClient }) => any;
};
