const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
const ms = require('parse-ms')
const db = require('croxydb')
const DBL = require('dblapi.js')


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


/*

BU KOMUDU HAZIRLADIĞI İÇİN HİVIN GARDAŞIMA ÇOK TEŞG EDİYORUM...
SONRADA EDİTLEDİĞİM İÇİN KENDİME TEŞG EDİYORUM...


*/

exports.run = async (client, message, args) => {
    const pac = await db.fetch(`pac-${message.author.id}`);
    const sho = await db.fetch(`sho-${message.author.id}`);
    const phy = await db.fetch(`phy-${message.author.id}`);
  
    let timeout = 3600000 //bunu ellemeyin 24 saat 

    let daily = await db.fetch(`antrgünlükkullanımgodareçdare-${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(`Antrenmanı tekrar yapabilmek için **${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye** beklemelisin!`)
    } else {
      if(client.ekoayarlar.dbloy == false) {
        db.set(`antrgünlükkullanımgodareçdare-${message.author.id}`, Date.now())
        if(client.ekoayarlar.rastgeleparads == true) {
          const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
          db.add(`pac-${message.author.id}`, 0.5)
          db.add(`sho-${message.author.id}`, 0.5)
          db.add(`phy-${message.author.id}`, 0.5)
          let para1 = new Discord.RichEmbed()
          .setColor(client.ekoayarlar.renk)
          .setDescription(`**Antrenman**`)
          .addField(`Antrenman Sonucu Kazandığınız Yetenekler = 0.5 Koşu, 0.5 Şut, 0.5 Fizik}`)
          message.channel.send(para1)
        } else {
          if(client.ekoayarlar.rastgeleparads == false) {
            db.add(`pac-${message.author.id}`, 0.5)
            db.add(`sho-${message.author.id}`, 0.5)
            db.add(`phy-${message.author.id}`, 0.5)
            let para1 = new Discord.RichEmbed()
            .setColor(client.ekoayarlar.renk)
            .setDescription(`**Antrenman**`)
            .addField(`Antrenman Sonucu Kazandığınız Yetenekler = 0.5 Koşu, 0.5 Şut, 0.5 Fizik}`)
            message.channel.send(para1)
          }
        }
      } else {
        if(client.ekoayarlar.dbloy == true) {
          const dbl = new DBL(client.ekoayarlar.dblkey, client)
          dbl.hasVoted(message.author.id).then(voted => {
            if(voted) {
              db.set(`antrgünlükkullanımgodareçdare-${message.author.id}`, Date.now())
              if(client.ekoayarlar.rastgelepara == true) {
                const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
                db.add(`pac-${message.author.id}`, 0.5)
                db.add(`sho-${message.author.id}`, 0.5)
                db.add(`phy-${message.author.id}`, 0.5)
                let para1 = new Discord.RichEmbed()
                .setColor(client.ekoayarlar.renk)
                .setDescription(`**Antrenman**`)
                .addField(`Antrenman Sonucu Kazandığınız Yetenekler = 0.5 Koşu, 0.5 Şut, 0.5 Fizik}`)
                message.channel.send(para1)
              } else {
                if(client.ekoayarlar.rastgeleparads == false) {
                  db.add(`pac-${message.author.id}`, 0.5)
                  db.add(`sho-${message.author.id}`, 0.5)
                  db.add(`phy-${message.author.id}`, 0.5)
                  let para1 = new Discord.RichEmbed()
                  .setColor(client.ekoayarlar.renk)
                  .setDescription(`**Antrenman**`)
                  .addField(`Antrenman Sonucu Kazandığınız Yetenekler = 0.5 Koşu, 0.5 Şut, 0.5 Fizik}`)
                  message.channel.send(para1)
                }
              }
            } else {
              return message.channel.send(`${client.ekoayarlar.dblmsj}`)
            }
          })
        }
      }
   }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['günlük-antrenman'],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'günlükpara',
    description: 'Günlük para alırsınız.',
    usage: 'günlükpara'
}