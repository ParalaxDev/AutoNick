const { MessageEmbed, Message } = require("discord.js");
// const fs = require('fs');
const editJsonFile = require("edit-json-file");




module.exports = {
    name: "addnick",
    category: "commands",
    description: "adds a nick config for a specific person",
    run: async(client, message, args, prefix) => {

        const file = editJsonFile(`nickConfig`);

        if(!message.member.roles.cache.find(r => r.name === "Mod")) message.channel.send("You dont have the right perms");

        nickToChangeId = message.mentions.users.first().id;
        newNick = args.join(' ').slice(args[0].length).trim();

        // fs.readFile('nickConfig.json', async(err, data) => {
        //     const json = [JSON.parse(data)]
        //     json.push(nickToChangeId, newNick)
        //     console.log(json)
        //     fs.writeFile("nickConfig.json", JSON.stringify(json, null, 4), async (err) => {
        //         if (err) throw err
        //     })
        // })

        file.set(nickToChangeId, newNick);

        file.save()

        
        message.channel.send(`👍`)
        message.guild.members.fetch(nickToChangeId).then(member => {
            member.setNickname(newNick)
                // .catch(error => message.channel.send("ok"));
        })// .catch(error => message.channel.send('fetch error'));
    }
}
