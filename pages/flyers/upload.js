import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function UploadFlyer() {
  const router = useRouter()
  const [form, setForm] = useState({
    file: null,
    storeId: '',
    validFrom: '',
    validTo: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setForm({ ...form, file: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const formData = new FormData()
    formData.append('file', form.file)
    formData.append('storeId', form.storeId)
    formData.append('validFrom', form.validFrom)
    formData.append('validTo', form.validTo)

    try {
      const res = await axios.post('http://localhost:3000/api/v1/flyers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('Flyer uploaded successfully.')
      router.push(`/flyers/${res.data.id}`)
    } catch (err) {
      console.error(err)
      setError('Upload failed. Please check the file and fields.')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Upload New Flyer</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Flyer File:
          <input type="file" name="file" accept="image/*,application/pdf" onChange={handleChange} required />
        </label><br /><br />

        <label>Store ID:
          <input type="text" name="storeId" value={form.storeId} onChange={handleChange} required />
        </label><br /><br />

        <label>Valid From:
          <input type="date" name="validFrom" value={form.validFrom} onChange={handleChange} required />
        </label><br /><br />

        <label>Valid To:
          <input type="date" name="validTo" value={form.validTo} onChange={handleChange} required />
        </label><br /><br />

        <button type="submit" style={{
          padding: '10px 20px',
          background: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px'
        }}>
          Upload Flyer
        </button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  )
}
