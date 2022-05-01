import { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v9';

export function determineMutualGuilds(
  userGuilds: RESTGetAPICurrentUserGuildsResult,
  botGuilds: RESTGetAPICurrentUserGuildsResult
) {
  return userGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));
}
