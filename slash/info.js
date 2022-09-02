const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("info :hmmm:"),

    run : async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue){
            return await interaction.editReply("There are mo songs left nig")
        }

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })
        await interaction.editReply({
            embeds: [new MessageEmbed()]
            .setThumbnail(song.thumbnail)
            .setDescription(`Current Bhajan is [${song.title}] (${song.url})\n\n` + bar)
        })
    },
}