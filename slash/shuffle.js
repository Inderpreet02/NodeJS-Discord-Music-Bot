const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("jiggle the queue :sedhomie:"),

    run : async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue){
            return await interaction.editReply("There are mo songs left nig")
        }

        queue.shuffle()
        await interaction.editReply(`The queue of ${queue.tracks.length} songs have been jiggled`)
    },

    
}