import { CommandType } from '../typings/Command';

export class Command {
    constructor(cmd_options: CommandType) {
        Object.assign(this, cmd_options);
    }
}
