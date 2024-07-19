const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
  } = (await import('@adiwajshing/baileys')).default
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

let emot = `${pickRandom(['ぎ', '᭻', '々', '〆', '∘'])}`
const defaultMenu = {
  before: `╔┈┈「 *معلومات البوت* 」
╎❏ *اسم البوت:* %me
╎❏ *الوضع:* %mode
╎❏ *المنصة:* %platform
╎❏ *النوع:* Node.Js
╎❏ *بايليز:* Multi Device
╎❏ *البريفكس:* [ *%prefixx* ]
╎❏ *الوقت التشغيلي:* %muptime
╎❏ *قاعدة البيانات:* %totalreg
╚────────────┈ ⳹ %read`.trimStart(),
  header: '\n╔┈┈「 *%category* 」',
  body: `╎${emot} %cmd`,
  footer: '╚────────────┈ ⳹',
  after: ``,
}

let handler = async (m, {  conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['anime', 'ai', 'downloader', 'internet', 'islamic', 'quotes', 'game', 'group', 'info', 'store', 'sticker', 'user', 'tools', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'anime') tags = {
    anime: 'أنيمي'
  }
  if (teks == 'ai') tags = {
    ai: 'ذكاء اصطناعي'
  }
  if (teks == 'downloader') tags = {
    downloader: 'تنزيل'
  }
  if (teks == 'internet') tags = {
    internet: 'إنترنت'
  }
  if (teks == 'islamic') tags = {
    islamic: 'إسلامي'
  }
  if (teks == 'quotes') tags = {
    quotes: 'اقتباسات'
  }
  if (teks == 'game') tags = {
    game: 'لعبة'
  }
  if (teks == 'group') tags = {
    group: 'مجموعة'
  }
  if (teks == 'info') tags = {
    info: 'معلومات'
  }
  if (teks == 'store') tags = {
    store: 'متجر'
  }
  if (teks == 'sticker') tags = {
    sticker: 'ملصق'
  }
  if (teks == 'user') tags = {
    user: 'مستخدم'
  }
  if (teks == 'tools') tags = {
    tools: 'أدوات'
  }
  if (teks == 'owner') tags = {
    owner: 'مالك'
  }
    let users = db.data.users[m.sender]
    let { exp, limit, level, role, daftar, umur, premium, hit, koin } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(users.level, global.multiplier)

    let name = await conn.getName(m.sender)
    let prems = `${users.premium ? "مستخدم بريميوم" : "مستخدم مجاني"}`
    let unLimit = `${users.premium ? "~ لانهائي ~" : users.limit}`    
    
    let ucap = `${ucapan()}`
    let tg = `@${m.sender.replace(/@.+/g, '')}`
    let mode = global.opts['self'] ? 'خاص' : 'عام'
    let platform = os.platform()
    let read = readMore 
    let prefixx = _p
    let nomornya = `${conn.getName(m.sender)}`

    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
    let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const targetDate = new Date('January 1, 2024 00:00:00')
    const currentDate = new Date()
    const remainingTime = targetDate.getTime() - currentDate.getTime()
    const seconds = Math.floor(remainingTime / 1000) % 60
    const minutes = Math.floor(remainingTime / 1000 / 60) % 60
    const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24
    const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24)
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let dateCountdown = `${days} يوم، ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية للعام الجديد!`     

    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.daftar == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    
// =================================== //
let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/905e3a17e33a046ccadeb.jpg')
const fkontak = {
        key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },
        message: {
            'contactMessage': {
                'displayName': `${name}`,
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;mari,;;;\nFN:mari,\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
                'jpegThumbnail': pp,
                thumbnail: pp,
                sendEphemeral: true
            }
        }
};

const data = {
    title: "اضغط هنا",
    sections: [{
            title: `المنيو الرئيسي`,
            rows: [{
                    title: "「ღ」بوت السرعة",
                    description: "يعرض سرعة استجابة البوت",
                    id: `.ping`
                },
                {
                    title: "「ღ」مالك البوت",
                    description: "يعرض مالك البوت ده",
                    id: `.owner`
                },
                {
                    title: "「ღ」مدة تشغيل البوت",
                    description: "يعرض مدة تشغيل البوت",
                    id: `.runtime`
                },
                {
                    title: "「ღ」قائمة المتاجر",
                    description: "يعرض المتاجر بما في ذلك تأجير البوت",
                    id: `.list`
                }
            ]
        },
        {
            title: `قائمة المنيو`,
            rows: [{
                    title: "「ღ」كل المنيو",
                    description: "يعرض كل ميزات البوت",
                    id: `${_p + command} allmenu`
                },
                {
                    title: "「ღ」منيو الأنمي",
                    description: "الميزة دي مخصوصة للناس اللي بتحب الأنمي",
                    id: `${_p + command} anime`
                },
                {
                    title: "「ღ」منيو الذكاء الاصطناعي",
                    description: "اطلب مساعدة الذكاء الاصطناعي لأنك مش قادر تعمل حاجة",
                    id: `${_p + command} ai`
                },
                {
                    title: "「ღ」منيو التحميل",
                    description: "متحملش حاجات غريبة يا عم!!!!",
                    id: `${_p + command} downloader`
                },
                {
                    title: "「ღ」منيو الإنترنت",
                    description: "ماتدورش على فيديوهات غير لائقة يا حبيبي...",
                    id: `${_p + command} internet`
                },
                {
                    title: "「ღ」منيو إسلامي",
                    description: "راحة البال في الدنيا والآخرة",
                    id: `${_p + command} islamic`
                },
                {
                    title: "「ღ」منيو اقتباسات",
                    description: "مش عشان تدور على حلول، لأ تدور على اقتباسات تتعلق بحالتك",
                    id: `${_p + command} quotes`
                },
                {
                    title: "「ღ」منيو الألعاب",
                    description: "مخصص للناس اللي عندها وقت فاضي",
                    id: `${_p + command} game`
                },
                {
                    title: "「ღ」منيو الجروب",
                    description: "الميزة دي هتفيدك جدًا لجروبك >,<",
                    id: `${_p + command} group`
                },
                {
                    title: "「ღ」منيو المعلومات",
                    description: "يعرض شوية معلومات أنت محتاجها",
                    id: `${_p + command} info`
                },
                {
                    title: "「ღ」منيو المتجر",
                    description: "الميزة دي لبحث عن دخل المالك والإداريين",
                    id: `${_p + command} store`
                },
                {
                    title: "「ღ」منيو الاستيكرات",
                    description: "ماتضحكش على وش صحابك وتخليه استيكر :v",
                    id: `${_p + command} sticker`
                },
                {
                    title: "「ღ」منيو المستخدم",
                    description: "ده لعرض البيانات بتاعتك اللي موجودة على نظام البوت",
                    id: `${_p + command} user`
                },
                {
                    title: "「ღ」منيو الأدوات",
                    description: "كتير استخدامها، لكن نادرًا ما تستخدم",
                    id: `${_p + command} Tools`
                },
                {
                    title: "「ღ」منيو المالك",
                    description: "الناس اللي مش مالكة مش لازم تفتح الميزة دي!!!!",
                    id: `${_p + command} owner`
                }
            ]
        }
    ]
}
let captimenu = `╭─「 *معلومات* 」
┊• *الاسم:* ${name}
┊• *العمر:* ${umur}
┊• *الرتبة:* ${level}
┊• *الدور:* ${role}
┊• *عدد المستخدمين:* ${Object.keys(global.db.data.users).length}
╰──────────┈༓`
let msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: captimenu
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: '_ملحوظة: لو لقيت ميزة فيها مشكلة، اتواصل مع المالك_'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: `هاي يا ${tg}`,
            subtitle: "",
            hasMediaAttachment: false
          }),
          contextInfo: {
          forwardingScore: 9999,
          isForwarded: false,
          mentionedJid: conn.parseMention(m.sender)
          },
          externalAdReply: { 
          showAdAttribution: true, 
          renderLargerThumbnail: false, 
          mediaType: 1
          },
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [{
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(data)
              }],
          })
        })
    }
  }
}, { quoted: fkontak })
    if (teks == '404') {
      return conn.relayMessage(m.chat, msgs.message, {})
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      //  for (let tag of plugin.tags)
      //  if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered By https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
     '%': '%', p: _p, uptime, muptime, me: conn.user.name, exp: exp - min, maxexp: xp, totalexp: exp, xp4levelup: max - exp <= 0 ? `جاهز لـ *${_p}levelup*` : `${max - exp} XP كمان عشان تطور مستوى`, level, limit, name, weton, week, date, dateIslamic, dateCountdown, time, totalreg, rtotalreg, role, readmore: readMore, umur, premium, prems, unLimit, ucap, tg, hit, mode, platform, read, wib, prefixx, koin, nomornya,
     }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
       await conn.sendMessage(m.chat, {
      text: text.trim(),
      contextInfo: {
      externalAdReply: {
      title: `مجموعة كلارا الرسمية`,
      body: global.author,
      thumbnailUrl: global.fotonya,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
      conn.sendFile(m.chat, "./vn/clara.mp3", "clara.mp3", null, m, true, { type: "audioMessage", ptt: true })
}
handler.help = ['menu']
handler.command = /^(menu|اوامر|help)$/i
handler.daftar = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  let time = moment.tz('Asia/Jakarta').format('HH')
  let res = "صباح الخير"
  if (time >= 4) res = "صباح النور"
  if (time > 10) res = "مساء الخير"
  if (time >= 15) res = "مساء الفل"
  if (time >= 18) res = "تصبح على خير"
  return res
}