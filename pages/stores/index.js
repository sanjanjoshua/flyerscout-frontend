import { useEffect, useState } from 'react'
import axios from 'axios'

export default function StoreList() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/stores')
      .then(res => setStores(res.data))
      .catch(console.error)
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Grocery Stores</h1>
      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {stores.map(store => (
            <li
              key={store.id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 0 6px rgba(0,0,0,0.1)'
              }}
            >
              <strong>{store.name}</strong> – {store.chain} <br />
              {store.location?.address}, {store.location?.city}, {store.location?.province}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
