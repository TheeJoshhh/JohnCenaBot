// Imports.
import { channel } from "diagnostics_channel";
import { Client, VoiceState, Collection, VoiceChannel } from "discord.js";
import { MINIMUM_MEMBERS, ODDS_OUT_OF_HUNDRED, FREQUENCY_MS, COOLDOWN } from '../config.json';
import fs from 'fs';
import ytdl from 'ytdl-core';
import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";

type ActiveGuild = {
    id: string;
    active: boolean;
    cooldownEnd: number;
}

let activeGuilds = new Collection<string, ActiveGuild>();

// Exports / Functions.
export function manager(client: Client) {
    client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
        // If the user joined a voice channel.
        if (oldState.channelId === null && newState.channelId !== null) {
            const channel = await newState.guild.channels.cache.get(newState.channelId)

            // If the guild doesn't have any cached info, create it.
            if (!activeGuilds.has(newState.guild.id)) {
                activeGuilds.set(newState.guild.id, { id: newState.guild.id, active: false, cooldownEnd: Date.now() });
            }

            // Get the guilds cached info.
            const cachedInfo = activeGuilds.get(newState.guild.id);

            // Guard clauses.
            if (activeGuilds.get(newState.guild.id)!.active) return; // If the guild is already set as active, return.
            if (!channel!.isVoice()) return; // If it isn't a voice channel, return.
            if (!channel.joinable) return; // If it isn't joinable, return.
            if (channel.members.size < MINIMUM_MEMBERS) return; // If the call is too small, return.
            
            // Set the guild as active.
            activeGuilds.set(newState.guild.id, { id: cachedInfo!.id, active: true, cooldownEnd: cachedInfo!.cooldownEnd });
        } else return;
    });
    setTimeout(pickAFight, FREQUENCY_MS, client);
}

function pickAFight(client: Client) {
    const guilds = [...activeGuilds.clone().filter(guild => guild.active && Date.now() >= guild.cooldownEnd).values()];
    
    guilds.forEach(guildInfo => {
        // Use the odds to determine if cena will attack. Return if he won't.
        if (Math.floor(Math.random() * 101) > ODDS_OUT_OF_HUNDRED) return;
 
        // Retrieve the guild data.
        const guild = client.guilds.cache.get(guildInfo.id);
        // If the guild can't be found, remove it from activeGuilds and return;
        if (!guild) return activeGuilds.delete(guildInfo.id);
        
        // Retrieve a list of "active" channels.
        const channels = guild.channels.cache.filter(c => c.type === 'GUILD_VOICE' && c.members.size >= MINIMUM_MEMBERS);

        // If there are no active channels, delete the guild from active guilds and return.
        if (channels.size < 1) return activeGuilds.delete(guildInfo.id);

        // If there is more than one active channel, pick one at random.
        const channel: VoiceChannel = channels.random() as VoiceChannel;
        
        // Pick a target member at random.
        const targetMember = channel.members.random();

        const resource = createAudioResource('src/sounds/johncena.mp3');
        const player = createAudioPlayer();

        const connection = joinVoiceChannel({
            channelId: channel.id,
	        guildId: channel.guild.id,
	        adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.subscribe(player);
        player.play(resource);

        setTimeout(() => {
            player.stop();
            connection.destroy();
            try {
                targetMember?.voice.disconnect();
            } catch (e) {
                console.log(e);
            }
        }, 14000);
        activeGuilds.set(guildInfo.id, { active: true, id: guildInfo.id, cooldownEnd: Date.now()+COOLDOWN })        
    });

    setTimeout(pickAFight, FREQUENCY_MS, client);
}