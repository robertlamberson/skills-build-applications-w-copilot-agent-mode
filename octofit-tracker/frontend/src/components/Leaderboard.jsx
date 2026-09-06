import CollectionView from './CollectionView'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

export default function Leaderboard() {
  return (
    <CollectionView collection="leaderboard" endpoint={leaderboardEndpoint} title="Leaderboard" description="Celebrate consistency and friendly competition." renderItem={(entry, index) => (
      <article className="data-card rank-card" key={entry._id || entry.id || index}>
        <span className="rank">#{entry.rank || index + 1}</span>
        <div>
          <h2>{entry.user?.displayName || entry.userId?.displayName || entry.username || entry.userId?.username || 'Athlete'}</h2>
          <p>{entry.points || 0} points</p>
        </div>
      </article>
    )} />
  )
}
