import CollectionView from './CollectionView'

export default function Users() {
  return (
    <CollectionView collection="users" title="Your community" description="Connect with teammates and keep each other moving." renderItem={(user, index) => (
      <article className="data-card" key={user._id || user.id || index}>
        <div className="avatar">{(user.displayName || user.username || 'U').charAt(0).toUpperCase()}</div>
        <h2>{user.displayName || user.username || 'Unnamed athlete'}</h2>
        <p>@{user.username || 'athlete'}</p>
        <small>{user.email || 'Profile ready to complete'}</small>
      </article>
    )} />
  )
}
