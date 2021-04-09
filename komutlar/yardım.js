const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, params) => {
 
  let prefix = ayarlar.prefix

  if (!params[0]) {
    message.channel.sendCode("asciidoc",`= Discord Soccer Manager Yardım Menüsü =
​
sm!hesap-oluştur İSİM : Hesap Oluşturur
sm!günlük-para : Günlük Para Alırsınız
sm!kasalar : Kasa Listesini Gösterir
sm!bilgiler : Bilgilerinizi Ve Bakiyenizi Gösterir
sm!transfer @isim Para : Para Transferi Yaparsınız
sm!kasaaç İD : Kasa Açarsınız Örn; sm!kasaaç 1
sm!kasabilgi : Seçtiğiniz Kasa Hakkında Bilgi Verir
​
`);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} =
​
Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`);
    }
  }
 
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'yardım',
  description: 'Komut kategorilerini gösterir.',
  usage: 'yardım'
};