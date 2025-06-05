import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MealPlansList() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/meal-plans')
      .then(res => {
        setPlans(res.data.mealPlans || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load meal plans.')
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Saved Meal Plans</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && plans.length === 0 && <p>No meal plans found.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {plans.map(plan => (
          <li key={plan.id} style={{
            background: '#fff',
            marginBottom: '12px',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)'
          }}>
            <strong>ID:</strong> {plan.id}<br />
            <strong>Budget:</strong> ${plan.budget}<br />
            <strong>Actual Cost:</strong> ${plan.actualCost}<br />
            <strong>Days:</strong> {plan.days}<br />
            <strong>People:</strong> {plan.people}<br />
            <strong>Generated At:</strong> {new Date(plan.generatedAt).toLocaleString()}<br />
            <strong>Valid Until:</strong> {new Date(plan.validUntil).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
