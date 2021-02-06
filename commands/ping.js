const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "returns the users ping in ms",
    run: async(client, message, args, prefix) => {

        const pingEmbed = new MessageEmbed()
                .setColor('#f54242')
                .setDescription(`🏓 Pinging...`)
            
            
        let msg = await message.channel.send(pingEmbed).then(m => {
            var ping = m.createdAt - message.createdAt;

            const pongEmbed = new MessageEmbed()
            .setColor('#f54242')
            .setDescription(`🏓 Pong\n\n⏳ ${ping}ms`)

            m.edit(pongEmbed)
            

        });

        // const pongEmbed = new MessageEmbed()
        //         .setColor(roleColor)
        //         .setDescription(`🏓 Pong\n\nIt took ${Math.round(message.createdAt - message.createdAt)}ms`)

        // msg.edit(pongEmbed)

        // embed.edit(`🏓 Pong\nIt took ${Math.floor(message.createdAt - message.createdAt)}ms`);
    }
}
