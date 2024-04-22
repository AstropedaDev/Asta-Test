const { smd, sendImage } = require("../lib");
const { fetch } = require("node-fetch");
smd(
  {
    pattern: "animesearch",
    desc: "Search for anime using the provided API.",
    category: "anime",
    filename: __filename,
    use: "<anime name>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.send("*_Please provide an anime name to search for!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/anime/search?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send(
          "*_An error occurred while searching for the anime._*"
        );
      }

      if (!data.result) {
        return await m.send(
          "*_No results found for the provided anime name._*"
        );
      }

      const { title, description, coverImage, genres, averageScore } =
        data.result;
      const message = `*Title:* ${title.romaji || title.english || title.native}
  *Description:* ${description}
  *Average Score:* ${averageScore}
  *Genres:* ${genres.join(", ")}
  *Cover Image:* ${coverImage.medium}`;

      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: animesearch`, e);
    }
  }
);
smd(
  {
    pattern: "searchcharacter",
    desc: "Search for anime characters using the provided API.",
    category: "anime",
    filename: __filename,
    use: "<character name>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.send(
          "*_Please provide a character name to search for!_*"
        );
      }

      const apiUrl = `https://api.maher-zubair.tech/anime/character?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send(
          "*_An error occurred while searching for the character._*"
        );
      }

      if (!data.result) {
        return await m.send(
          "*_No results found for the provided character name._*"
        );
      }

      const { name, description, image, favourites, media } = data.result;
      const message = `*Name:* ${name.full || name.native}
  *Description:* ${description}
  *Favorites:* ${favourites}
  *Image:* ${image.medium}
  
  *Media:*
  ${media.nodes
    .map((node) => `- ${node.title.romaji || node.title.native} (${node.type})`)
    .join("\n")}`;

      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: searchcharacter`, e);
    }
  }
);
smd(
  {
    pattern: "manga",
    desc: "Get information about a manga using the provided API.",
    category: "anime",
    filename: __filename,
    use: "<manga name>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.send("*_Please provide a manga name to search for!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/anime/manga?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send(
          "*_An error occurred while searching for the manga._*"
        );
      }

      if (!data.result) {
        return await m.send(
          "*_No results found for the provided manga name._*"
        );
      }

      const {
        title,
        coverImage,
        format,
        status,
        genres,
        description,
        averageScore,
        synonyms,
        characters,
      } = data.result;
      const message = `*Title:* ${title.romaji || title.english || title.native}
  *Format:* ${format}
  *Status:* ${status}
  *Genres:* ${genres.join(", ")}
  *Average Score:* ${averageScore}
  *Description:* ${description}
  *Cover Image:* ${coverImage.medium}
  
  *Synonyms:* ${synonyms.join(", ")}
  
  *Characters:*
  ${characters.nodes
    .map((node) => `- ${node.name.full || node.name.native}`)
    .join("\n")}`;

      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: manga`, e);
    }
  }
);
smd(
  {
    pattern: "gojo",
    desc: "Send a Gojo video.",
    category: "anime",
    filename: __filename,
    use: "!gojo",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/gojo";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the video._*");
      }

      if (!data.url) {
        return await m.send("*_No video URL found in the response._*");
      }

      const videoUrl = data.url;
      const videoBuffer = await m.bot.getBuffer(videoUrl);

      await m.bot.sendVideo(m.from, videoBuffer, "gojo.mp4", "Gojo Video", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: gojo`, e);
    }
  }
);
smd(
  {
    pattern: "yuta",
    desc: "Send a Yuta video.",
    category: "anime",
    filename: __filename,
    use: "!yuta",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/yuta";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the video._*");
      }

      if (!data.url) {
        return await m.send("*_No video URL found in the response._*");
      }

      const videoUrl = data.url;
      const videoBuffer = await m.bot.getBuffer(videoUrl);

      await m.bot.sendVideo(m.from, videoBuffer, "yuta.mp4", "Yuta Video", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: yuta`, e);
    }
  }
);
smd(
  {
    pattern: "yuji",
    desc: "Send a Yuji video.",
    category: "anime",
    filename: __filename,
    use: "!yuji",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/yuji";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the video._*");
      }

      if (!data.url) {
        return await m.send("*_No video URL found in the response._*");
      }

      const videoUrl = data.url;
      const videoBuffer = await m.bot.getBuffer(videoUrl);

      await m.bot.sendVideo(m.from, videoBuffer, "yuji.mp4", "Yuji Video", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: yuji`, e);
    }
  }
);
smd(
  {
    pattern: "goku",
    desc: "Send a Goku video.",
    category: "anime",
    filename: __filename,
    use: "!goku",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/goku";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the video._*");
      }

      if (!data.url) {
        return await m.send("*_No video URL found in the response._*");
      }

      const videoUrl = data.url;
      const videoBuffer = await m.bot.getBuffer(videoUrl);

      await m.bot.sendVideo(m.from, videoBuffer, "goku.mp4", "Goku Video", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: goku`, e);
    }
  }
);
smd(
  {
    pattern: "animestatus",
    desc: "Send a random anime status video.",
    category: "anime",
    filename: __filename,
    use: "!animestatus",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/status";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.result) {
        return await m.send("*_An error occurred while fetching the status._*");
      }

      const statusTitle = data.result.title || "No title available";
      const statusUrl = data.result.url;

      if (!statusUrl) {
        return await m.send("*_No status URL found in the response._*");
      }

      const statusMessage = `*Title:* ${statusTitle}\n*URL:* ${statusUrl}`;
      await m.send(statusMessage);
    } catch (e) {
      await m.error(`${e}\n\ncommand: animestatus`, e);
    }
  }
);
smd(
  {
    pattern: "kaneki",
    desc: "Send an image of Kaneki.",
    category: "anime",
    filename: __filename,
    use: "!kaneki",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/kaneki";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "kaneki.jpg", "Kaneki Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: kaneki`, e);
    }
  }
);
smd(
  {
    pattern: "akira",
    desc: "Send an image related to Akira.",
    category: "anime",
    filename: __filename,
    use: "!akira",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/akira";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "akira.jpg", "Akira Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: akira`, e);
    }
  }
);
smd(
  {
    pattern: "asuna",
    desc: "Send an image related to Asuna.",
    category: "anime",
    filename: __filename,
    use: "!asuna",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/asuna";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "asuna.jpg", "Asuna Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: asuna`, e);
    }
  }
);
smd(
  {
    pattern: "boruto",
    desc: "Send an image related to Boruto.",
    category: "anime",
    filename: __filename,
    use: "!boruto",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/boruto";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "boruto.jpg", "Boruto Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: boruto`, e);
    }
  }
);
smd(
  {
    pattern: "chiho",
    desc: "Send a GIF related to Chiho.",
    category: "anime",
    filename: __filename,
    use: "!chiho",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/chiho";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the GIF._*");
      }

      const gifUrl = data.url;
      await m.bot.sendVideo(m.from, gifUrl, "chiho.gif", "Chiho GIF", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: chiho`, e);
    }
  }
);
smd(
  {
    pattern: "eba",
    desc: "Send an image related to Eba.",
    category: "anime",
    filename: __filename,
    use: "!eba",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/eba";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "eba.jpg", "Eba Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: eba`, e);
    }
  }
);
smd(
  {
    pattern: "elaina",
    desc: "Send an image related to Elaina.",
    category: "anime",
    filename: __filename,
    use: "!elaina",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/elaina";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "elaina.png", "Elaina Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: elaina`, e);
    }
  }
);
smd(
  {
    pattern: "erza",
    desc: "Send an image related to Erza.",
    category: "anime",
    filename: __filename,
    use: "!erza",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/erza";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "erza.png", "Erza Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: erza`, e);
    }
  }
);
smd(
  {
    pattern: "inori",
    desc: "Send an image related to Inori.",
    category: "anime",
    filename: __filename,
    use: "!inori",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/inori";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "inori.jpg", "Inori Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: inori`, e);
    }
  }
);
smd(
  {
    pattern: "itachi",
    desc: "Send an image related to Itachi.",
    category: "anime",
    filename: __filename,
    use: "!itachi",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/itachi";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "itachi.jpg", "Itachi Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: itachi`, e);
    }
  }
);
smd(
  {
    pattern: "itori",
    desc: "Send an image related to Itori.",
    category: "anime",
    filename: __filename,
    use: "!itori",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/itori";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "itori.jpg", "Itori Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: itori`, e);
    }
  }
);
smd(
  {
    pattern: "kaga",
    desc: "Send an image related to Kaga.",
    category: "anime",
    filename: __filename,
    use: "!kaga",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/kaga";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "kaga.jpg", "Kaga Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: kaga`, e);
    }
  }
);
smd(
  {
    pattern: "kaori",
    desc: "Send an image related to Kaori.",
    category: "anime",
    filename: __filename,
    use: "!kaori",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/kaori";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "kaori.jpg", "Kaori Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: kaori`, e);
    }
  }
);
smd(
  {
    pattern: "kotori",
    desc: "Send an image related to Kotori.",
    category: "anime",
    filename: __filename,
    use: "!kotori",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/kotori";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "kotori.jpg", "Kotori Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: kotori`, e);
    }
  }
);
smd(
  {
    pattern: "kurumi",
    desc: "Send an image related to Kurumi.",
    category: "anime",
    filename: __filename,
    use: "!kurumi",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/kurumi";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "kurumi.jpg", "Kurumi Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: kurumi`, e);
    }
  }
);
smd(
  {
    pattern: "miku",
    desc: "Send an image related to Miku.",
    category: "anime",
    filename: __filename,
    use: "!miku",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/miku";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "miku.jpg", "Miku Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: miku`, e);
    }
  }
);
smd(
  {
    pattern: "nezuko",
    desc: "Send an image related to Nezuko.",
    category: "anime",
    filename: __filename,
    use: "!nezuko",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/nezuko";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "nezuko.jpg", "Nezuko Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: nezuko`, e);
    }
  }
);
smd(
  {
    pattern: "sakura",
    desc: "Send an image related to Sakura.",
    category: "anime",
    filename: __filename,
    use: "!sakura",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/sakura";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "sakura.jpg", "Sakura Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: sakura`, e);
    }
  }
);
smd(
  {
    pattern: "sasuke",
    desc: "Send an image related to Sasuke.",
    category: "anime",
    filename: __filename,
    use: "!sasuke",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/sasuke";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "sasuke.jpg", "Sasuke Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: sasuke`, e);
    }
  }
);
smd(
  {
    pattern: "husbu",
    desc: "Send an image related to Husbando.",
    category: "anime",
    filename: __filename,
    use: "!husbu",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/husbu";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "husbu.jpg", "Husbu Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: husbu`, e);
    }
  }
);
smd(
  {
    pattern: "shota",
    desc: "Send an image related to Shota.",
    category: "anime",
    filename: __filename,
    use: "!shota",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/anime/shota";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.url) {
        return await m.send("*_An error occurred while fetching the image._*");
      }

      const imageUrl = data.url;
      await m.bot.sendImage(m.from, imageUrl, "shota.jpg", "Shota Image", m);
    } catch (e) {
      await m.error(`${e}\n\ncommand: shota`, e);
    }
  }
);
