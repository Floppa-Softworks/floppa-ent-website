export const discordApiFetcher = async (url: string, token?: string, bot: boolean = false) => {
  if (!token) return;
  const res = await fetch(`https://discord.com/api/v9${url}`, {
    headers: {
      Authorization: `${bot ? 'Bot' : 'Bearer'} ${token}`,
    },
  });
  // eslint-disable-next-line consistent-return
  if (res) return res.json();
};
