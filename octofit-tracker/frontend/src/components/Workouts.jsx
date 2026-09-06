import CollectionView from './CollectionView'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

export default function Workouts() {
  return (
    <CollectionView collection="workouts" endpoint={workoutsEndpoint} title="Workout suggestions" description="Personalized ideas to help you reach your next milestone." renderItem={(workout, index) => (
      <article className="data-card workout-card" key={workout._id || workout.id || index}>
        <span className="difficulty">{workout.difficulty || 'Any level'}</span>
        <h2>{workout.name || 'Suggested workout'}</h2>
        <p>{workout.description || 'A focused session for your goals.'}</p>
        <small>{workout.durationMinutes || workout.duration || 0} minutes</small>
      </article>
    )} />
  )
}
