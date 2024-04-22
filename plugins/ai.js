const { smd, prefix, send, Config } = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

smd(
  {
    pattern: "youai",
    desc: "Generate text using the YouAI API",
    category: "ai",
    use: "<query>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      const query = match || message.reply_text;
      if (!query) {
        return await message.reply(
          "*Please provide a query to generate text.*"
        );
      }

      const url = `https://api.maher-zubair.tech/ai/youai?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetchJson(url);

      if (response.status !== 200) {
        return await message.reply(`*Error: ${response.result}*`);
      }

      const output = response.result;
      await message.reply(output);
    } catch (error) {
      console.error(error);
      await message.reply("*An error occurred while generating text.*");
    }
  }
);
smd(
  {
    pattern: "characterai",
    desc: "Generate text using the CharacterAI API",
    category: "ai",
    use: "<query>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      const query = match || message.reply_text;
      if (!query) {
        return await message.reply(
          "*Please provide a query to generate text.*"
        );
      }

      const url = `https://api.maher-zubair.tech/ai/characterai?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetchJson(url);

      if (response.status !== 200) {
        return await message.reply(`*Error: ${response.result}*`);
      }

      const reply = response.result.replies[0].text;
      const avatar = response.result.src_char.avatar_file_name;

      if (avatar) {
        await message.reply(reply, {
          caption: reply,
          image: { url: `https://api.maher-zubair.tech/uploads/${avatar}` },
        });
      } else {
        await message.reply(reply);
      }
    } catch (error) {
      console.error(error);
      await message.reply("*An error occurred while generating text.*");
    }
  }
);
smd(
  {
    pattern: "blackbox2",
    desc: "Generate text using the Blackbox AI API",
    category: "ai",
    use: "<query>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      const query = match || message.reply_text;
      if (!query) {
        return await message.reply(
          "*Please provide a query to generate text.*"
        );
      }

      const url = `https://api.maher-zubair.tech/ai/blackbox?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetchJson(url);

      if (response.status !== 200) {
        return await message.reply(`*Error: ${response.result}*`);
      }

      const output = response.result;
      await message.reply(`\`\`\`${output}\`\`\``);
    } catch (error) {
      console.error(error);
      await message.reply("*An error occurred while generating text.*");
    }
  }
);
smd(
  {
    pattern: "palm",
    desc: "Generate text using the Palm AI API",
    category: "ai",
    use: "<query>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      const query = match || message.reply_text;
      if (!query) {
        return await message.reply(
          "*Please provide a query to generate text.*"
        );
      }

      const url = `https://api.maher-zubair.tech/ai/palm?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetchJson(url);

      if (response.status !== 200) {
        return await message.reply(`*Error: ${response.result}*`);
      }

      const output = response.result.output;
      const safetyRatings = response.result.safetyRatings;

      let safetyRatingsText = "";
      for (const rating of safetyRatings) {
        safetyRatingsText += `\n*${rating.category}*: ${rating.probability}`;
      }

      await message.reply(`*Output:* ${output}${safetyRatingsText}`);
    } catch (error) {
      console.error(error);
      await message.reply("*An error occurred while generating text.*");
    }
  }
);
smd(
  {
    pattern: "dalle",
    desc: "Generate images using the DALL-E AI.",
    category: "image",
    filename: __filename,
    use: "<prompt>",
  },
  async (m, prompt) => {
    try {
      if (!prompt) {
        return await m.send("*_Please provide a text prompt!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/dalle?q=${encodeURIComponent(
        prompt
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const data = await response.json();
        const error =
          data.err || `Error: ${response.status} ${response.statusText}`;
        return await m.send(`*_${error}_*`);
      }

      const data = await response.json();
      const result = data.result;

      if (!result || !result.length) {
        return await m.send("*_No images received from the API!_*");
      }

      const images = result;
      for (const image of images) {
        const imageUrl = image;
        await m.bot.sendFromUrl(
          m.from,
          imageUrl,
          `DALL-E Image for: ${prompt}`,
          m,
          {},
          "image"
        );
      }
    } catch (e) {
      await m.error(`${e}\n\ncommand: dalle`, e);
    }
  }
);
smd(
  {
    pattern: "aiimage",
    desc: "Generate AI images based on a given prompt.",
    category: "ai",
    filename: __filename,
    use: "<prompt>",
  },
  async (m, prompt) => {
    try {
      if (!prompt) {
        return await m.send("*_Please provide a text prompt!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/aiimg?q=${encodeURIComponent(
        prompt
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result || !result.aiImageData || !result.aiImageData.length) {
        return await m.send("*_No images received from the API!_*");
      }

      const images = result.aiImageData;
      for (const image of images) {
        const highResUrl = image.imageHighResolution.url;
        const caption = `*${image.name}*`;
        await m.bot.sendFromUrl(m.from, highResUrl, caption, m, {}, "image");
      }
    } catch (e) {
      await m.error(`${e}\n\ncommand: aiimage`, e);
    }
  }
);
smd(
  {
    pattern: "solve",
    desc: "Solve a mathematical expression or problem.",
    category: "ai",
    filename: __filename,
    use: "<expression>",
  },
  async (m, expression) => {
    try {
      if (!expression) {
        return await m.send(
          "*_Please provide a mathematical expression or problem to solve!_*"
        );
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/mathssolve?q=${encodeURIComponent(
        expression
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result) {
        return await m.send("*_No result received from the API!_*");
      }

      await m.send(`*Solution:*\n\n${result}`);
    } catch (e) {
      await m.error(`${e}\n\ncommand: solve`, e);
    }
  }
);
smd(
  {
    pattern: "aidetect",
    desc: "Detect if a given text is AI-generated or human-written.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (m, text) => {
    try {
      if (!text) {
        return await m.send("*_Please provide a text to analyze!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/txtdetect?q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result || !result.data) {
        return await m.send("*_No result received from the API!_*");
      }

      const { isHuman, feedback, additional_feedback, input_text } =
        result.data;
      const output = `*Input Text:* ${input_text}\n\n*Likelihood of being AI-generated:* ${
        100 - isHuman
      }%\n\n*Feedback:* ${feedback}\n${additional_feedback}`;

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: aidetect`, e);
    }
  }
);
smd(
  {
    pattern: "prompt",
    desc: "Generate AI prompts for image creation.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (m, text) => {
    try {
      const apiUrl = `https://api.maher-zubair.tech/ai/prompt-gen?q=${encodeURIComponent(
        text || ""
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const results = data.result;

      if (!results || !results.length) {
        return await m.send("*_No prompts received from the API!_*");
      }

      const output = results
        .map((result, index) => `${index + 1}. ${result.text}`)
        .join("\n\n");
      await m.send(`*AI Prompts:*\n\n${output}`);
    } catch (e) {
      await m.error(`${e}\n\ncommand: prompt`, e);
    }
  }
);
smd(
  {
    pattern: "llama",
    desc: "Chat with the Llama AI assistant.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (m, text) => {
    try {
      if (!text) {
        return await m.send("*_Please provide a text prompt!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/llama-2?q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result) {
        return await m.send("*_No result received from the API!_*");
      }

      await m.send(result);
    } catch (e) {
      await m.error(`${e}\n\ncommand: llama`, e);
    }
  }
);
smd(
  {
    pattern: "rmbg",
    alias: ["removebg"],
    category: "ai",
    filename: __filename,
    desc: "Remove image Background.",
  },
  async (m) => {
    try {
      let [imageMessage] = ["imageMessage"];
      let messageWithImage = imageMessage.includes(m.mtype)
        ? m
        : m.reply_message;

      if (
        !messageWithImage ||
        !imageMessage.includes(messageWithImage?.mtype || "null")
      ) {
        return await m.send("*_Uhh Dear, Reply to an image_*");
      }

      let imagePath = await m.bot.downloadAndSaveMediaMessage(messageWithImage);
      let uploadedImage = await TelegraPh(imagePath);

      try {
        fs.unlinkSync(imagePath);
      } catch {}

      let apiUrl = `https://api.maher-zubair.tech/misc/rmbg?url=${uploadedImage}`;
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(
          jsonResponse.result,
          { caption: Config.caption },
          "image",
          m
        );
      } else {
        await m.send("*_Request not be preceed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: rmbg",
        error,
        "*_No responce from remove.bg, Sorry!!_*"
      );
    }
  }
);
smd(
  {
    pattern: "sd",
    desc: "Generates an image using Stable Diffusion AI.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (message, input) => {
    try {
      const text = input.trim();
      if (!text) {
        return await message.send(
          "*_Please provide some text to generate an image._*"
        );
      }

      const apiUrl = `https://aemt.me/stablediffusion?text=${encodeURIComponent(
        text
      )}`;
      const response = await axios.get(apiUrl, {
        headers: {
          accept: "application/json",
        },
        responseType: "arraybuffer",
      });

      if (!response.data) {
        return await message.reply(
          "*Failed to generate an image using Stable Diffusion AI.*"
        );
      }

      const buffer = Buffer.from(response.data, "binary");
      await message.bot.sendMessage(
        message.chat,
        { image: buffer },
        { quoted: message }
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: stablediffusion",
        error,
        "*Failed to use Stable Diffusion AI.*"
      );
    }
  }
);
smd(
  {
    pattern: "bard",
    alias: ["b"],
    desc: "Generates a response from Bard AI.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (message, input) => {
    try {
      const text = input.trim();
      if (!text) {
        return await message.send(
          "*_Please provide some text to generate a response._*"
        );
      }

      const apiUrl = `https://aemt.me/bard?text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          accept: "application/json",
        },
      });
      const data = response.data;

      if (!data || !data.status) {
        return await message.reply(
          "*Failed to generate a response from Bard AI.*"
        );
      }

      const result = data.result;
      return await message.send(`*Bard AI:* ${result}`, { quoted: message });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: bard",
        error,
        "*Failed to use Bard AI.*"
      );
    }
  }
);
smd(
  {
    pattern: "gpt4",
    category: "ai",
    desc: "Chat with GPT-4 AI model",
    use: "<text>",
    filename: __filename,
  },
  async (message, text, { cmdName }) => {
    if (!text)
      return message.reply(
        `*_Please provide a query_*\n*_Example ${
          prefix + cmdName
        } What is the meaning of life?_*`
      );

    try {
      const res = await (
        await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${text}`)
      ).json();

      if (!res.status === 200)
        return message.send("*There's a problem, try again later!*");

      const { result } = res;
      const astro = "𝘼𝙎𝙏𝘼 𝙂𝙋𝙏4\n ";
      const tbl = "```";
      await send(message, `${astro}${tbl}${result}${tbl}`);
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ${cmdName}`,
        e,
        `*_An error occurred while processing your request_*`
      );
    }
  }
);
smd(
  {
    pattern: "gemini",
    category: "ai",
    desc: "Chat with Bard AI model",
    use: "<text>",
    filename: __filename,
  },
  async (message, text, { cmdName }) => {
    if (!text)
      return message.reply(
        `*_Please provide a query_*\n*_Example ${
          prefix + cmdName
        } What is the meaning of life?_*`
      );

    try {
      const res = await (
        await fetch(`https://api.maher-zubair.tech/ai/gemini?q=${text}`)
      ).json();

      if (!res.status === 200)
        return message.send("*There's a problem, try again later!*");

      const { result } = res;
      const astro = "𝘼𝙎𝙏𝘼*GEMINI* 𝘼𝙄";
      const tbl = "```";
      await send(message, `${astro}${tbl}${result}${tbl}`);
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ${cmdName}`,
        e,
        `*_An error occurred while processing your request_*`
      );
    }
  }
);
smd(
  {
    pattern: "photoleap",
    desc: "Generate an image using the PhotoLeap AI.",
    category: "image",
    filename: __filename,
    use: "<text>",
  },
  async (m, text) => {
    try {
      if (!text) {
        return await m.send("*_Please provide a text prompt!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/ai/photoleap?q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result) {
        return await m.send("*_No result received from the API!_*");
      }

      await m.bot.sendFromUrl(
        m.from,
        result,
        `PhotoLeap Image for: ${text}`,
        m,
        {},
        "image"
      );
    } catch (e) {
      await m.error(`${e}\n\ncommand: photoleap`, e);
    }
  }
);
smd(
  {
    cmdname: "alexa",
    category: "ai",
    use: "[text]",
    filename: __filename,
    info: "chat with simsimi alexa ai!",
  },
  async (m, text) => {
    try {
      if (!text) {
        return await m.reply(`Hi *${m.senderName}*, do you want to talk?`);
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `text=${encodeURIComponent(text)}&lc=en&key=`,
      };

      const response = await fetch(
        "https://api.simsimi.vn/v2/simtalk",
        options
      );
      const data = await response.json();

      if (data.status === "200" && data.message) {
        m.reply(data.message);
      } else {
        m.reply("*No Response!*");
      }
    } catch (e) {
      await m.error(`${e}\n\ncommand : poetry`, e, false);
    }
  }
);
smd(
  {
    pattern: "gpt",
    desc: "Get a response from the GPT-4 API.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (m, text) => {
    try {
      if (!text) {
        return await m.send("*_Please provide a text prompt!_*");
      }

      const apiUrl = `https://aemt.me/v2/gpt4?text=${encodeURIComponent(text)}`;
      const response = await fetch(apiUrl, {
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result) {
        return await m.send("*_No result received from the API!_*");
      }

      await m.send(result);
    } catch (e) {
      await m.error(`${e}\n\ncommand: gpt`, e);
    }
  }
);
smd(
  {
    pattern: "blackbox",
    desc: "Get information about a given text from the BlackBox API.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (m, text) => {
    try {
      if (!text) {
        return await m.send("*_Please provide a text to analyze!_*");
      }

      const apiUrl = `https://aemt.me/blackbox?text=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(apiUrl, {
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const result = data.result;

      if (!result) {
        return await m.send("*_No results found!_*");
      }

      const lines = result
        .split("\n")
        .map((line, i) => `${i + 1}. ${line.trim()}`);
      const output = `*BlackBox Result:*\n\n${lines.join("\n")}`;

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: blackbox`, e);
    }
  }
);
const anonMsgs = {};

class AnonymousMsg {
  constructor(sender, receiver, message) {
    this.id = `anony-msg-${Math.floor(100000 + Math.random() * 900000)}`;
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.replies = [];
    this.infoSent = false;
  }

  async sendMessage(bot) {
    const { date, time } = await getDateTime();
    const formattedMessage = `*ᴀsᴛᴀ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n\n*Msg_Id:* ${this.id}\n*Date:* _${date}_\n*Time:* _${time}_\n\n*Message:* ${this.message}\n\n\n${Config.caption}`;
    await bot.sendMessage(this.receiver, { text: formattedMessage });
  }

  async sendReplyInfo(bot, quoted) {
    if (this.infoSent) return;
    this.infoSent = true;
    const replyInfo = `*Basically, It's an Anonymous Message*\n\n_Msg_Id: ${this.id}_\n_This message was sent by a chatbot_\n_The user doesn't want to expose themselves_\n\n\n*To reply to the user:*\n*Reply to this message with:* reply, Your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n${Config.caption}`;
    await bot.sendMessage(this.receiver, { text: replyInfo }, { quoted });
  }

  async sendReply(bot, reply, quoted) {
    const formattedReply = `*ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @${
      this.receiver.split("@")[0]
    }_*\n*_Msg_Id: ${this.id}_*\n\n*Message:* ${reply}\n\n\n\n${
      Config.caption
    }`;
    await bot.sendMessage(
      this.sender,
      { text: formattedReply, mentions: [this.receiver] },
      { quoted }
    );
    this.replies.push(reply);
  }
}
let cmdName = "anonymsg";
smd(
  {
    pattern: "anonymsg",
    alias: ["recognition", "anonychat"],
    desc: "Send message Anonymously",
    category: "ai",
    use: "<Hii, Astro>",
    filename: __filename,
  },
  async (message, match, { smd }) => {
    try {
      const input = match || message.reply_text;
      if (!input) {
        return await message.send(
          `*Provide number with msg to send Anonymously.* \n*Example ${
            prefix + cmdName
          } 2348039607375,your_Message*`,
          {},
          "",
          message
        );
      }

      if (message.isCreator && input === "info") {
        const activeReceivers = Object.values(anonMsgs)
          .map((msg) => msg.receiver)
          .filter((receiver, index, self) => self.indexOf(receiver) === index);
        return await message.reply(
          activeReceivers.length === 0
            ? "*There's no Anonymous Chat created yet*"
            : `*Anonymous Chat Receivers*\n_${activeReceivers.join(", ")}_`
        );
      }

      const [number, messageText] = input.split(",").map((part) => part.trim());
      if (!number || !messageText) {
        return await message.reply(
          "*Invalid format. Please provide both number and Message separated by a comma.*"
        );
      }

      const receiver = `${number}@s.whatsapp.net`;
      const parsedJid = (await parsedJid(receiver)) || [];
      if (!parsedJid[0]) {
        return await message.reply("*_Provided number is not valid!!!_*");
      }

      const anonMsg = new AnonymousMsg(
        message.sender,
        parsedJid[0],
        messageText
      );
      anonMsgs[anonMsg.id] = anonMsg;
      await anonMsg.sendMessage(message.bot);
      return await message.reply("*_Anonymous message sent successfully_*");
    } catch (error) {
      await message.error(
        error + "\n\ncommand: " + smd,
        error,
        "*_Can't send anonymous message yet, Sorry!!_*"
      );
    }
  }
);

smd(
  {
    on: "text",
  },
  async (message) => {
    try {
      if (message.quoted && message.text.length > 2) {
        const [command, reply] = message.text
          .split(",")
          .map((part) => part.trim());
        if (command.toLowerCase() === "reply") {
          const quotedMessage = message.reply_text.split("\n");
          if (quotedMessage.length < 3 || !quotedMessage[2].includes("Msg_Id"))
            return;

          const msgId = quotedMessage[2].replace("*Msg_Id:* ", "").trim();
          const anonMsg = anonMsgs[msgId];
          if (!anonMsg) return;

          await anonMsg.sendReplyInfo(message.bot, message);
          await anonMsg.sendReply(message.bot, reply, message);

          if (anonMsg.replies.length >= 2) {
            delete anonMsgs[msgId];
          }

          return await message.reply(
            `*_Your Message successfully delivered to User_* ${
              anonMsg.replies.length === 1
                ? "\n*You can reply 1 more time*"
                : ""
            } `
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
