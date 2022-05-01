import { gql } from '@apollo/client';

export const GET_GUILD_CONFIG_QUERY = (guildId: string) => gql`
  query Query {
    getGuildConfig(guildId: \"${guildId}"\)
  }
`;

export const UPDATE_GUILD_CONFIG_MUTATION = gql`
  mutation Mutation($guildId: String!, $defaultVolume: Float!, $autoplayOnQueueCreate: Boolean!) {
    updateGuildConfig(
      updateData: {
        guildId: $guildId
        defaultVolume: $defaultVolume
        autoplayOnQueueCreate: $autoplayOnQueueCreate
      }
    )
  }
`;
