const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Nigger likha to hua hai"),

    run : async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue){
            return await interaction.editReply("There are mo songs left nig")
        }

        queue.derstroy()
        await interaction.editReply("cya! looser")
    }
}