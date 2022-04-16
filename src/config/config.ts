import { readFileSync } from "fs";

const TRELLO_DEFAULT = {
  boards: [],
  key: "",
  token: "",
};

const DISCORD_DEFAULT = {
  token: "",
  serverId: "",
  channelId: "",
};

const DEFAULT = {
  trello: TRELLO_DEFAULT,
  discord: DISCORD_DEFAULT,
};

export type TrelloConfigType = typeof TRELLO_DEFAULT;
export type DiscordConfigType = typeof DISCORD_DEFAULT;
export type ConfigType = typeof DEFAULT;

const parseConfig = (filename = "config.json"): ConfigType => {
  try {
    const result = JSON.parse(readFileSync(filename, "utf-8"));

    return {
      trello: {
        ...TRELLO_DEFAULT,
        ...result.trello,
      },
      discord: {
        ...DISCORD_DEFAULT,
        ...result.discord,
      },
    };
  } catch (e) {
    return DEFAULT;
  }
};

export { parseConfig };
