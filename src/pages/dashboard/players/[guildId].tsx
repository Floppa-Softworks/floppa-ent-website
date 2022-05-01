import { useRouter } from 'next/router';
import { ViewPlayer } from '../../../components/ViewPlayer';

export default function ConfigPage() {
  const { query } = useRouter();
  const guildId = query.guildId as string;

  return <ViewPlayer guildId={guildId} />;
}
