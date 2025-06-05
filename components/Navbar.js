import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{ background: '#222', padding: '10px' }}>
      <Link href="/" style={{ color: '#fff', marginRight: '15px' }}>Dashboard</Link>
      <Link href="/stores" style={{ color: '#fff', marginRight: '15px' }}>Stores</Link>
      <Link href="/flyers" style={{ color: '#fff', marginRight: '15px' }}>Flyers</Link>
      <Link href="/flyers/upload" style={{ color: '#fff', marginRight: '15px' }}>Upload Flyer</Link>
      <Link href="/items" style={{ color: '#fff', marginRight: '15px' }}>Items</Link>
      <Link href="/meal-plans/new" style={{ color: '#fff', marginRight: '15px' }}>Generate Plan</Link>
      <Link href="/meal-plans" style={{ color: '#fff' }}>Saved Plans</Link>
    </nav>
  )
}
