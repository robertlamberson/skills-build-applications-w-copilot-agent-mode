import CollectionView from './CollectionView'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

export default function Teams() {
  return (
    <CollectionView collection="teams" endpoint={teamsEndpoint} title="Teams" description="Find your crew and make every challenge more rewarding." renderItem={(team, index) => (
      <article className="data-card" key={team._id || team.id || index}>
        <span className="card-icon">◎</span>
        <h2>{team.name || 'Team'}</h2>
        <p>{team.description || 'A team ready to move together.'}</p>
        <small>{team.memberIds?.length || team.members?.length || 0} members</small>
      </article>
    )} />
  )
}
