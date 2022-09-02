const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current mujik"),

    run : async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue){
            return await interaction.editReply("There are mo songs left nig")
        }

        const currentSong = queue.current;

        queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setDescription(`${currentSong.title} haj been skipped`)
                .setThumbnail(song.thumbnail)
            ]
        })
    }
}