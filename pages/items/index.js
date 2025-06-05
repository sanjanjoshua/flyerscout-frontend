import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ItemList() {
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({
    storeId: '',
    category: '',
    onSale: '',
    minDiscount: '',
    search: ''
  })

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const fetchItems = async () => {
    const params = {}

    if (filters.storeId) params.storeId = filters.storeId
    if (filters.category) params.category = filters.category
    if (filters.onSale !== '') params.onSale = filters.onSale === 'true'
    if (filters.minDiscount) params.minDiscount = filters.minDiscount
    if (filters.search) params.search = filters.search

    try {
      const res = await axios.get('http://localhost:3000/api/v1/items', { params })
      setItems(res.data.items || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Extracted Items</h1>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <input name="storeId" placeholder="Store ID" value={filters.storeId} onChange={handleChange} style={{ marginRight: '10px' }} />
        <input name="category" placeholder="Category" value={filters.category} onChange={handleChange} style={{ marginRight: '10px' }} />
        <select name="onSale" value={filters.onSale} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="">On Sale?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <input name="minDiscount" type="number" placeholder="Min % Off" value={filters.minDiscount} onChange={handleChange} style={{ marginRight: '10px' }} />
        <input name="search" placeholder="Search" value={filters.search} onChange={handleChange} style={{ marginRight: '10px' }} />
        <button onClick={fetchItems} style={{
          padding: '6px 14px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          Filter
        </button>
      </div>

      {/* Item List */}
      {items.length === 0 ? <p>No items found.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{
              background: '#fff',
              marginBottom: '10px',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)'
            }}>
              <strong>{item.name}</strong> – {item.brand || 'No brand'}<br />
              {item.category} — {item.unit} <br />
              {item.isOnSale ? (
                <span style={{ color: 'green' }}>
                  🔥 On Sale! ${item.salePrice} (was ${item.originalPrice}, {item.discountPercentage}% off)
                </span>
              ) : (
                <span>${item.originalPrice}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
