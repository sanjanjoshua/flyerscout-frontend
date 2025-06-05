import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function FlyerDetails() {
  const router = useRouter()
  const { id } = router.query

  const [flyer, setFlyer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    axios.get(`http://localhost:3000/api/v1/flyers/${id}`)
      .then(res => {
        setFlyer(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError('Flyer not found.')
        setLoading(false)
      })
  }, [id])

  const handleExtract = async () => {
    setMessage('')
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/flyers/${id}/extract`)
      setMessage(res.data.message)
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage('Flyer already processed.')
      } else {
        setMessage('Extraction failed.')
      }
    }
  }

  if (loading) return <p style={{ padding: '20px' }}>Loading...</p>
  if (error) return <p style={{ padding: '20px', color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Flyer Details</h1>

      <p><strong>Store ID:</strong> {flyer.storeId}</p>
      <p><strong>Valid:</strong> {flyer.validFrom} to {flyer.validTo}</p>
      <p><strong>Status:</strong> {flyer.status}</p>

      <a href={flyer.fileUrl} target="_blank" rel="noopener noreferrer">📄 View Flyer File</a>

      <br /><br />
      {flyer.status === 'processed' ? (
        <p style={{ color: 'green' }}>✅ Items already extracted: {flyer.extractedItemsCount}</p>
      ) : (
        <button
          onClick={handleExtract}
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Extract Items
        </button>
      )}

      {message && <p style={{ marginTop: '10px', color: 'blue' }}>{message}</p>}
    </div>
  )
}
