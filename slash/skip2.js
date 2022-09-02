const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip2")
        .setDescription("Skips to a certain song number")
        .addNumberOption((option) => {
            option.setName("tracknumber")
            .setDescription("the track to ship to")
            .setMinValue(1).setRequired(true)
        }),

    run : async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue){
            return await interaction.editReply("There are mo songs left nig")
        }

        const trackNum = interaction.options.getNumber("tracknumber")

        if(trackNum > queue.tracks.length){
            return await interaction.editReply("Aacha zayada dimag hai kya?")
        }
        queue.skipTo(trackNum - 1)
        await interaction.editReply(`Skipped to track number${trackNum}`)
    }
}