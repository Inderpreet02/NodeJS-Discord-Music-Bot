const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the mujik"),

    run : async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue){
            return await interaction.editReply("There are mo songs left nig")
        }

        queue.setPaused(false)
        await interaction.editReply("Theek hai bhai kardiya UwU")
    }
}