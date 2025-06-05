import { useState } from 'react'
import axios from 'axios'

export default function MealPlanForm() {
  const [form, setForm] = useState({
    budget: '',
    days: '',
    people: '2',
    dietaryRestrictions: [],
    preferredStores: [],
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    complexity: 'simple'
  })

  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox' && name === 'dietaryRestrictions') {
      setForm({
        ...form,
        dietaryRestrictions: checked
          ? [...form.dietaryRestrictions, value]
          : form.dietaryRestrictions.filter(r => r !== value)
      })
    } else if (name === 'mealTypes') {
      setForm({
        ...form,
        mealTypes: checked
          ? [...form.mealTypes, value]
          : form.mealTypes.filter(m => m !== value)
      })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setPlan(null)

    try {
      const res = await axios.post('http://localhost:3000/api/v1/meal-plans/generate', {
        ...form,
        budget: parseFloat(form.budget),
        days: parseInt(form.days),
        people: parseInt(form.people)
      })

      setPlan(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to generate meal plan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '700px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Generate Meal Plan</h1>

      <form onSubmit={handleSubmit}>
        <label>Budget ($): <input type="number" name="budget" value={form.budget} onChange={handleChange} required /></label><br /><br />
        <label>Days: <input type="number" name="days" value={form.days} onChange={handleChange} required /></label><br /><br />
        <label>People: <input type="number" name="people" value={form.people} onChange={handleChange} /></label><br /><br />

        <label>Dietary Restrictions:</label><br />
        {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher'].map(opt => (
          <label key={opt} style={{ marginRight: '10px' }}>
            <input type="checkbox" name="dietaryRestrictions" value={opt} onChange={handleChange} />
            {opt}
          </label>
        ))}
        <br /><br />

        <label>Meal Types:</label><br />
        {['breakfast', 'lunch', 'dinner', 'snack'].map(opt => (
          <label key={opt} style={{ marginRight: '10px' }}>
            <input type="checkbox" name="mealTypes" value={opt} onChange={handleChange} checked={form.mealTypes.includes(opt)} />
            {opt}
          </label>
        ))}
        <br /><br />

        <label>Complexity:
          <select name="complexity" value={form.complexity} onChange={handleChange}>
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
            <option value="complex">Complex</option>
          </select>
        </label>
        <br /><br />

        <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none' }}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {plan && (
        <div style={{ marginTop: '30px' }}>
          <h2>Meal Plan</h2>
          <p><strong>Budget:</strong> ${plan.budget} → <strong>Actual:</strong> ${plan.actualCost}</p>
          <p><strong>Total Savings:</strong> ${plan.totalSavings}</p>

          <h3>Meals:</h3>
          <ul>
            {plan.meals.map((meal, i) => (
              <li key={i}>
                <strong>Day {meal.day} - {meal.mealType}:</strong> {meal.name} — {meal.estimatedCost ? `$${meal.estimatedCost}` : 'N/A'}
              </li>
            ))}
          </ul>

          <h3>Shopping List:</h3>
          <ul>
            {plan.shoppingList.map((item, i) => (
              <li key={i}>
                {item.name} ({item.quantity}) – ${item.salePrice} from {item.store}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
