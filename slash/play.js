const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("loads songs from youtube")
        .addSubcommand((subcommand) => 
            subcommand
                .setName("song")
                .setDescription("Loads a single song from a url")
                .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
        )
        .addSubcommand((subcommand) => 
            subcommand
                .setName("playlist")
                .setDescription("Loads a playlist of songs from a url")
                .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("Searches for song based on niggers knoladge")
                .addStringOption((option) => 
                    option.setName("searchterms").setDescription("the search keywords").setRequired(true)
                )
        ),
        run: async ({ client, interation }) => {
            if (interation.member.voice.channel){
                return interation.editReply("Why gay go in vc")
            }

            const queue = await client.player.createQueue(interation.guild)
            if(!queue.connection){
                await queue.connect(interation.member.voice.channel)
            }

            let embed = new MessageEmbed()

            if(interation.options.getSubcommand() === "song"){
                let url = interation.options.getString("url")

                const result = await client.player.search(url, {
                    requestedBy: interation.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })

                if(result.tracks.length === 0){
                    return interation.editReply("no results")
                }

                const song = result.tracks[0]

                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration ${song.duration}`})

            } else if(interation.options.getSubcommand() === "playlist"){

                let url = interation.options.getString("url")

                const result = await client.player.search(url, {
                    requestedBy: interation.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })

                if(result.tracks.length === 0){
                    return interation.editReply("no results")
                }

                const playlist = result.playlist
                await queue.addTrack(result.tracks)
                embed
                    .setDescription(`**${result.songs.length} songs have been added, [${playlist.title}](${playlist.url})** have been added to Queue`)
                    .setThumbnail(playlist.thumbnail)

            }else if(interation.options.getSubcommand() === "search"){

                let url = interation.options.getString("searchterms")

                const result = await client.player.search(url, {
                    requestedBy: interation.user,
                    searchEngine: QueryType.AUTO
                })

                if(result.tracks.length === 0){
                    return interation.editReply("no results")
                }

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration ${song.duration}`})
            }

            if(!queue.playing){
                await interation.editReply({
                    embeds: [embed]
                })
            }
        }
}