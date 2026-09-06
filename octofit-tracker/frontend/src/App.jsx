import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './api'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'People'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">Welcome to OctoFit</p>
      <h1>Small steps.<br /><span>Strong momentum.</span></h1>
      <p className="hero-copy">Track your movement, find your people, and turn daily effort into progress.</p>
      <div className="overview-actions">
        <NavLink className="primary-button" to="/workouts">Find a workout</NavLink>
        <NavLink className="text-link" to="/leaderboard">View leaderboard →</NavLink>
      </div>
      <div className="overview-grid">
        <div><strong>05</strong><span>ways to move</span></div>
        <div><strong>01</strong><span>community to cheer you on</span></div>
        <div><strong>∞</strong><span>reasons to keep going</span></div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">✦</span> octofit</NavLink>
        <nav aria-label="Primary navigation">
          {navigation.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer>Connected to <code>{apiBaseUrl}</code></footer>
    </div>
  )
}

export default App
