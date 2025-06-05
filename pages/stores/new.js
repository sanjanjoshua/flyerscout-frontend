import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AddStore() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    chain: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: form.name,
      chain: form.chain,
      location: {
        address: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode
      }
    }

    try {
      await axios.post('http://localhost:3000/api/v1/stores', payload)
      router.push('/stores') // redirect back to list
    } catch (err) {
      console.error('Error creating store:', err)
      alert('Failed to create store')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Add New Store</h1>
      <form onSubmit={handleSubmit}>
        {['name', 'chain', 'address', 'city', 'province', 'postalCode'].map(field => (
          <div key={field} style={{ marginBottom: '15px' }}>
            <label htmlFor={field} style={{ display: 'block', marginBottom: '5px' }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        ))}

        <button type="submit" style={{
          padding: '10px 20px',
          background: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Save Store
        </button>
      </form>
    </div>
  )
}
