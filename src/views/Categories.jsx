import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/http.js'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const { data } = await api.get(`/category`)
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function removeCategory (id) {
    try {
      await api.delete(`/category/${id}`)
      
      setCategories(categories.filter(category => category.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  function goToDetails (id) {
    navigate(`/categories/${id}`)
  }

  function goToCreateNew () {
    navigate(`/categories/new`)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <div className='flex items-center mb-10'>
        <h1 className='page--title'>Categories</h1>
        <button className='ml-auto' onClick={() => goToCreateNew()}>Create New Category</button>
      </div>
      <table className='w-full table--main'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th width="120">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <span onClick={() => goToDetails(category.id)} className='underline cursor-pointer mr-2'>Edit</span>
                <span onClick={() => removeCategory(category.id)} className='text-red underline cursor-pointer'>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Categories