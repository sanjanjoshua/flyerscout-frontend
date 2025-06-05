import { useEffect, useState } from 'react'
import axios from 'axios'

export default function FlyersPage() {
  const [flyers, setFlyers] = useState([])
  const [storeId, setStoreId] = useState('')
  const [month, setMonth] = useState('')
  const [active, setActive] = useState('')
  
  const fetchFlyers = async () => {
    const params = {}
    if (storeId) params.storeId = storeId
    if (month) params.month = month
    if (active !== '') params.active = active === 'true'

    try {
      const res = await axios.get('http://localhost:3000/api/v1/flyers', { params })
      setFlyers(res.data.flyers || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchFlyers()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Flyers</h1>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          style={{ marginRight: '10px', padding: '6px' }}
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ marginRight: '10px', padding: '6px' }}
        />
        <select
          value={active}
          onChange={(e) => setActive(e.target.value)}
          style={{ marginRight: '10px', padding: '6px' }}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button onClick={fetchFlyers} style={{
          padding: '8px 16px',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Filter
        </button>
      </div>

      {/* Flyer List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {flyers.map(flyer => (
          <li key={flyer.id} style={{
            background: '#fff',
            marginBottom: '10px',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 0 4px rgba(0,0,0,0.1)'
          }}>
            <strong>Store:</strong> {flyer.storeId} <br />
            <strong>Valid:</strong> {flyer.validFrom} to {flyer.validTo} <br />
            <strong>Status:</strong> {flyer.status} <br />
            <a href={flyer.fileUrl} target="_blank" rel="noopener noreferrer">
              📄 View Flyer
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
