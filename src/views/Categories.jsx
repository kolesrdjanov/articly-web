import { useState, useEffect } from 'react'
import api from '@/http.js'

const Categories = () => {
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const { data } = await api.get(`/category`)
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <h1 className='page--title mb-10'>Categories</h1>
      <table className='w-full table--main'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Categories