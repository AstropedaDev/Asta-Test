const util = require("util");
const fs = require("fs-extra");
const {
  cmd
} = require("../lib/plugins");
const {
  formatp,
  TelegraPh,
  smd,
  prefix,
  runtime,
  Config,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
smd({
  pattern: "readmore",
  alias: ["rmore", "readmor"],
  desc: "Adds *readmore* in given text.",
  category: "user",
  filename: __filename
}, async (_0x5db0de, _0x38fb87) => {
  try {
    let _0x5ea4b8 = _0x38fb87 ? _0x38fb87 : _0x5db0de.reply_text;
    if (!_0x5ea4b8) {
      _0x5ea4b8 = "*Uhh Dear,Please provide text*\n*Eg:- _.readmor text1 readmore text2_*";
    } else {
      _0x5ea4b8 += " ";
    }
    if (_0x5ea4b8.includes("readmore")) {
      await _0x5db0de.reply(_0x5ea4b8.replace(/readmore/, String.fromCharCode(8206).repeat(4001)));
    } else {
      await _0x5db0de.reply(_0x5ea4b8.replace(" ", String.fromCharCode(8206).repeat(4001)));
    }
  } catch (_0x36cb2c) {
    await _0x5db0de.error(_0x36cb2c + "\n\ncommand : readmore", _0x36cb2c, false);
  }
});
let pmtypes = ["videoMessage", "imageMessage"];
cmd({
  pattern: "url",
  alias: ["createurl"],
  category: "general",
  filename: __filename,
  desc: "image to url.",
  use: "<video | image>"
}, async _0x4e4351 => {
  try {
    let _0x680da4 = pmtypes.includes(_0x4e4351.mtype) ? _0x4e4351 : _0x4e4351.reply_message;
    if (!_0x680da4 || !pmtypes.includes(_0x680da4?.mtype)) {
      return _0x4e4351.reply("*_Uhh Dear, Reply To An Image/Video!_*");
    }
    let _0x349452 = await _0x4e4351.bot.downloadAndSaveMediaMessage(_0x680da4);
    let _0x536aa6 = await createUrl(_0x349452);
    if (!_0x536aa6) {
      return _0x4e4351.reply("*_Failed To Create Url!_*");
    }
    try {
      fs.unlink(_0x349452);
    } catch {}
    await _0x4e4351.send(util.format(_0x536aa6), {}, "suhail", _0x680da4);
  } catch (_0x2ee8cc) {
    await _0x4e4351.error(_0x2ee8cc + "\n\ncommand url", _0x2ee8cc);
  }
});
cmd({
  pattern: "upload",
  alias: ["url2"],
  category: "general",
  filename: __filename,
  desc: "image to url.",
  use: "<video | image>"
}, async _0xbda24 => {
  try {
    let _0x7d6de1 = pmtypes.includes(_0xbda24.mtype) ? _0xbda24 : _0xbda24.reply_message;
    if (!_0x7d6de1 || !pmtypes.includes(_0x7d6de1?.mtype)) {
      return _0xbda24.reply("*_Uhh Dear, Reply To An Image/Video!_*");
    }
    let _0xeb95de = await _0xbda24.bot.downloadAndSaveMediaMessage(_0x7d6de1);
    let _0x3e1ea8 = await createUrl(_0xeb95de, "uguMashi");
    try {
      fs.unlink(_0xeb95de);
    } catch {}
    if (!_0x3e1ea8 || !_0x3e1ea8.url) {
      return _0xbda24.reply("*_Failed To Create Url!_*");
    }
    await _0xbda24.send(util.format(_0x3e1ea8.url), {}, "suhail", _0x7d6de1);
  } catch (_0x1a2f02) {
    await _0xbda24.error(_0x1a2f02 + "\n\ncommand upload", _0x1a2f02);
  }
});
smd({
  pattern: "calc",
  desc: "calculate an equation.",
  category: "general",
  use: "<equation>",
  filename: __filename
}, async (_0x5d95a7, _0x28af98) => {
  try {
    if (!_0x28af98) {
      return await _0x5d95a7.reply("*Please enter a math operation*\n*Example: .calc 22+12*");
    }
    let _0xcebecd = _0x28af98.replace(/\s+/g, "");
    if (!/^(\d+([-+%*/]\d+)+)$/.test(_0xcebecd)) {
      return await _0x5d95a7.reply("Please enter a valid mathematical operation.");
    }
    const _0x38ba36 = _0x3b53fe => {
      return new Function("return " + _0x3b53fe)();
    };
    const _0x5e0640 = _0x38ba36(_0xcebecd);
    if (_0xcebecd.includes("/") && _0xcebecd.split("/").some(_0x413293 => _0x413293 === "0")) {
      return _0x5d95a7.reply("Cannot divide by zero.");
    }
    if (_0xcebecd.split(/[-+%*/]/).length <= 2) {
      const [_0x120f57, _0x1de7dc, _0x112a0e] = _0xcebecd.match(/\d+|[-+%*/]/g);
      return await _0x5d95a7.reply(_0x120f57 + " " + _0x1de7dc + " " + _0x112a0e + " = " + _0x5e0640);
    } else {
      return await _0x5d95a7.reply("Result: " + _0x5e0640);
    }
  } catch (_0x120f52) {
    return await _0x5d95a7.error(_0x120f52 + "\n\ncommand: calc", _0x120f52);
  }
});
smd(
  {
    pattern: "repo",
    alias: ["git", "sc", "script"],
    desc: "Sends info about repo",
    category: "general",
    filename: __filename,
  },
  async (m) => {
    try {
      const { data } = await axios.get(
        "https://api.github.com/repos/Astropeda/Asta-Md"
      );
      const repoInfo =
        `
ᴀsᴛᴀ ᴍᴅ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴘᴀᴛᴄʜ ${Config.VERSION} ᴜsᴇᴅ ʙʏ *${Config.ownername}*. 
*Stars:* ${data?.stargazers_count || "120+"} stars
*Forks:* ${data?.forks_count || "1000+"} forks
*Auther:* Astropeda
*Create:* ${data?.created_at || "undefined"}
*Repo:* https://github.com/Astropeda/Asta-Md
*Scan:* ${scan}
${Config.caption ? "\n\n" + Config.caption : ""}`.trim();
      return await m.sendUi(m.jid, { caption: repoInfo });
    } catch (error) {
      await m.error(error + "\n\ncommand: repo", error);
    }
  }
);
smd({
  pattern: "status",
  alias: ["about", "info"],
  desc: "To check bot status",
  category: "general",
  filename: __filename
}, async _0x397531 => {
  try {
    const _0x2d09cb = process.uptime();
    timestampe = speed();
    latensie = speed() - timestampe;
    let _0x53eb40 = (" 🔰 *I am " + Config.botname + "* 🔰\n  *❲❒❳ Description:* A WhatsApp bot with rich features, Created By *" + Config.ownername + "*.\n\n  *❲❒❳ Speed:* " + latensie.toFixed(4) + " ms\n  *❲❒❳ Uptime:* " + runtime(process.uptime()) + "\n  *❲❒❳ Version:* " + Config.VERSION + "\n  *❲❒❳ Owner:*  " + Config.ownername + "\n\n  *❲❒❳ Support:* _" + gurl + "_ \n" + (Config.caption ? "\n\n" + Config.caption : "")).trim();
    return await _0x397531.bot.sendUi(_0x397531.jid, {
      caption: _0x53eb40
    });
  } catch {}
});
smd({
  pattern: "cpu",
  desc: "To check bot status",
  category: "general",
  filename: __filename
}, async _0x51c639 => {
  try {
    const _0x78d515 = process.memoryUsage();
    const _0x14b376 = os.cpus().map(_0x4baa78 => {
      _0x4baa78.total = Object.keys(_0x4baa78.times).reduce((_0x124129, _0x54fdbe) => _0x124129 + _0x4baa78.times[_0x54fdbe], 0);
      return _0x4baa78;
    });
    const _0x52bb92 = _0x14b376.reduce((_0x371aab, _0x42f37d, _0x41ec3e, {
      length: _0x3f2c1a
    }) => {
      _0x371aab.total += _0x42f37d.total;
      _0x371aab.speed += _0x42f37d.speed / _0x3f2c1a;
      _0x371aab.times.user += _0x42f37d.times.user;
      _0x371aab.times.nice += _0x42f37d.times.nice;
      _0x371aab.times.sys += _0x42f37d.times.sys;
      _0x371aab.times.idle += _0x42f37d.times.idle;
      _0x371aab.times.irq += _0x42f37d.times.irq;
      return _0x371aab;
    }, {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0
      }
    });
    timestampe = speed();
    latensie = speed() - timestampe;
    var _0x54755f = performance.now();
    var _0x366cd8 = performance.now();
    respon = ("*❲❒❳ " + Config.botname + " Server Info ❲❒❳*\n\n  *❲❒❳ Runtime:* " + runtime(process.uptime()) + "\n  *❲❒❳ Speed:* " + latensie.toFixed(3) + "/" + (_0x366cd8 - _0x54755f).toFixed(3) + " ms\n  *❲❒❳ RAM:* " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n  *❲❒❳ Memory Usage:*\n      " + Object.keys(_0x78d515).map((_0x4a444a, _0xf623b7, _0x26f7ee) => _0x4a444a.padEnd(Math.max(..._0x26f7ee.map(_0x470f51 => _0x470f51.length)), " ") + ": " + formatp(_0x78d515[_0x4a444a])).join("\n      ") + "\n\n" + (_0x14b376[0] ? "  *❲❒❳ Total CPU Usage:*\n  *" + _0x14b376[0].model.trim() + " (" + _0x52bb92.speed + " MHZ)*\n      " + Object.keys(_0x52bb92.times).map(_0x1a945a => "-" + (_0x1a945a + "").padEnd(6) + ": " + (_0x52bb92.times[_0x1a945a] * 100 / _0x52bb92.total).toFixed(2) + "%").join("\n      ") + "\n\n  *❲❒❳ CPU Core Usage (" + _0x14b376.length + " Core CPU)*\n  " + _0x14b376.map((_0x1ada4d, _0x5999d4) => "*Core " + (_0x5999d4 + 1) + ": " + _0x1ada4d.model.trim() + " (" + _0x1ada4d.speed + " MHZ)*\n      " + Object.keys(_0x1ada4d.times).map(_0x2cc08d => "-" + (_0x2cc08d + "").padEnd(6) + ": " + (_0x1ada4d.times[_0x2cc08d] * 100 / _0x1ada4d.total).toFixed(2) + "%").join("\n      ")).join("\n\n") : "") + "\n").trim();
    return await _0x51c639.send(respon, {}, "", _0x51c639);
  } catch (_0x102a1d) {
    await _0x51c639.error(_0x102a1d + "\n\ncommand: cpu", _0x102a1d, "*_No responce from Server side, Sorry!!_*");
  }
});
smd({
  pattern: "advt",
  alias: ["advertisement"],
  category: "ai",
  desc: "Advertise of your Message, by sending it to provided nmbr range.",
  use: "9231844741xx,Your_text_here",
  fromMe: true,
  filename: __filename
}, async (_0x165087, _0x13462a) => {
  try {
    let _0x14810d = _0x13462a ? _0x13462a : _0x165087.reply_text;
    if (!_0x14810d) {
      return await _0x165087.reply("*Advertise of your Message*\n*by sending it to provided nmbr range.*\n" + prefix + "advt 9231844741xx,Your_text_here");
    }
    const _0x94ba67 = _0x14810d.indexOf(",");
    if (_0x94ba67 === -1) {
      return await _0x165087.send("*Invalid format. Please provide number and Message separated by a comma.*");
    }
    let _0xd9b857 = "" + _0x14810d.slice(0, _0x94ba67).trim();
    let _0x321dea = _0x14810d.slice(_0x94ba67 + 1).trim() + "\n\n\n" + Config.caption;
    if (!_0xd9b857.includes("x")) {
      return _0x165087.send("*You did not add x in number.*\n*Ex: " + prefix + "advt 9231844741xx,Your_Message_here*  \n " + Config.caption);
    }
    await _0x165087.send("*Sending message to given number range.!*\n*It may take some time, so wait please*");
    function _0x4affa2(_0x9f9b09, _0x557f5a) {
      return _0x9f9b09.split(_0x557f5a).length - 1;
    }
    var _0x43ad94 = _0xd9b857.split("x")[0];
    var _0x1d8f31 = _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")] ? _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")] : "";
    var _0x43415b = _0x4affa2(_0xd9b857, "x");
    var _0x4f926f;
    if (_0x43415b == 1) {
      _0x4f926f = 10;
    } else if (_0x43415b == 2) {
      _0x4f926f = 100;
    } else if (_0x43415b == 3) {
      _0x4f926f = 1000;
    } else if (_0x43415b > 3) {
      return await _0x165087.send("*Only 3(x) are Allowed in number*");
    }
    let _0x1e111b = 0;
    let _0x5c0975 = "";
    var _0x5b9d27 = "";
    for (let _0x3e0552 = 0; _0x3e0552 < _0x4f926f; _0x3e0552++) {
      var _0x4d017c = await _0x165087.bot.onWhatsApp("" + _0x43ad94 + _0x3e0552 + _0x1d8f31 + "@s.whatsapp.net");
      if (_0x4d017c[0]) {
        _0x5b9d27 = _0x4d017c[0].jid;
        if (_0x5c0975.includes(_0x5b9d27)) {
          continue;
        }
        await sleep(1500);
        await _0x165087.bot.sendMessage(_0x5b9d27, {
          text: _0x321dea
        });
        _0x5c0975 = _0x5c0975 + "," + _0x5b9d27;
        _0x1e111b += 1;
      }
    }
    return await _0x165087.send("*_Advertisement of your Message is Done,_* \n\n*_Message Succesfully sent to " + _0x1e111b + " chats_*\nLast_User: " + _0x5b9d27.split("@")[0] + "\nSearch_No: " + _0x4f926f + " number searched\n\n\n" + Config.caption);
  } catch (_0xfcb50a) {
    await _0x165087.error(_0xfcb50a + "\n\ncommand: dalle", _0xfcb50a, "*_No responce from Server side, Sorry!!_*");
  }
});