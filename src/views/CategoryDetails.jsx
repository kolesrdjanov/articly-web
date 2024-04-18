import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import api from '@/http.js'

const CategoryDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState({
    name: ''
  })

  const fetchCategory = async () => {
    try {
      const { data } = await api.get(`/category/${id}`)
      setCategory(data)
    } catch (error) {
      console.error(error)
    }
  }

  const saveCategory = async () => {
    try {
      if (id) {
        await api.put(`/category/${id}`, category)
      } else {
        await api.post(`/category`, category)
      }

      navigate('/categories')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    setCategory({
      ...category,
      name: event.target.value
    })
  }

  useEffect(() => {
    if (id) {
      fetchCategory()
    }
  }, [])

  return (
    <div>
      <div className='flex items-center mb-10'>
        <h1 className='page--title'>{ id ? 'Category Details' : 'Create New Category' }</h1>
      </div>
      
      <div className='grid grid-cols-12 w-full'>
        <div className='col-span-6'>
          <div className='mb-4'>
            <label className='mb-1 block w-full text-sm'>Name</label>
            <input
              className='w-full'
              type="text"
              value={category.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className='flex items-center gap-4'>
            <button className='ml-auto' onClick={() => saveCategory()}>{id ? 'Update Category' : 'Save Category'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryDetails