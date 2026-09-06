import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export default function CollectionView({ collection, endpoint, title, description, renderItem }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchCollection(collection, endpoint)
      .then((nextItems) => {
        if (active) {
          setItems(nextItems)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message)
          setStatus('error')
        }
      })
    return () => {
      active = false
    }
  }, [collection, endpoint])

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="record-count">{items.length} records</span>
      </div>
      {status === 'loading' && <div className="state-card">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="state-card error-state">{error}</div>}
      {status === 'ready' && (
        <div className="collection-grid">
          {items.length ? items.map((item, index) => renderItem(item, index)) : (
            <div className="state-card">No {title.toLowerCase()} found yet.</div>
          )}
        </div>
      )}
    </section>
  )
}
