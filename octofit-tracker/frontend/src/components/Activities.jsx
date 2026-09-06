import CollectionView from './CollectionView'

export default function Activities() {
  return (
    <CollectionView collection="activities" title="Activity feed" description="See the latest training wins from your community." renderItem={(activity, index) => (
      <article className="data-card activity-card" key={activity._id || activity.id || index}>
        <span className="card-icon">↗</span>
        <h2>{activity.type || activity.name || 'Workout'}</h2>
        <p>{activity.durationMinutes || activity.duration || 0} minutes</p>
        <small>{activity.calories ? `${activity.calories} calories` : 'Keep the momentum going'}</small>
      </article>
    )} />
  )
}
