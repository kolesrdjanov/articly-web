import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '@/http.js'

const ArticleDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [article, setArticle] = useState({
    title: '',
    content: JSON.stringify([
      { type: 'text', content: 'This is a text block in article!'}
    ]),
    category_id: ''
  })

  const fetchCategories = async () => {
    try {
      const { data } = await api.get(`/category`)
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchArticle = async () => {
    try {
      const { data } = await api.get(`/article/${id}`)
      setArticle(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (key, event) => {
    setArticle({
      ...article,
      [key]: event.target.value
    })
  }

  const saveArticle = async () => {
    try {
      if (id) {
        await api.put(`/article/${id}`, article)
      } else {
        await api.post(`/article`, article)
      }

      navigate('/articles')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    if (id) {
      fetchArticle()
    }
  }, [])

  return (
    <div>
      <input
        type="text"
        value={article.title}
        onChange={(e) => handleChange('title', e)}
      />

      <select
        value={article.category_id}
        onChange={(e) => handleChange('category_id', e)}
        >
        {categories.map(({ id, name }, index) => <option key={index} value={id}>{name}</option>)}
      </select>

      <button onClick={() => saveArticle()}>{id ? 'Update' : 'Save'}</button>
    </div>
  )
}

export default ArticleDetails