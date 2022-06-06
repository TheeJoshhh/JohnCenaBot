import { Client, ExcludeEnum } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

// Types
type presence = {
    text: string;
    type: ExcludeEnum<typeof ActivityTypes, "CUSTOM">;
}

// Constants
const statusFrequency = 1000 * 120; // How often (ms) the bot updates it's status.
const presences: presence[] = [ // A list of statuses that will be picked at random.
    { text: 'for my next target.', type: 'WATCHING' },
    { text: 'It\'s not your fault you\'re not this hard - John Cena', type: 'PLAYING' },
    { text: 'I called immigration; they took your green card - John Cena', type: 'PLAYING' },
    { text: 'in the WWE.', type: 'COMPETING' }
];

export default function changePresence(client: Client) {
    const index = Math.floor(Math.random() * presences.length);
    client.user?.setActivity(presences[index].text, { type: presences[index].type });
    setTimeout(changePresence, statusFrequency, client);
}