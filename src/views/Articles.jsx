import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/http.js'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const navigate = useNavigate()

  const fetchArticles = async () => {
    try {
      const { data } = await api.get(`/article`)
      setArticles(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function removeArticle (id) {
    try {
      await api.delete(`/article/${id}`)
      setArticles(articles.filter(article => article.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  function goToDetails (id) {
    navigate(`/articles/${id}`)
  }

  function goToCreateNew () {
    navigate(`/articles/new`)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div>
      <div className='flex items-center mb-10'>
        <h1 className='page--title'>Articles</h1>
        <button className='ml-auto' onClick={() => goToCreateNew()}>Create New Article</button>
      </div>
      
      <table className='w-full table--main'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th width="120">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td className='actions'>
                <span onClick={() => goToDetails(article.id)} className='underline cursor-pointer mr-2'>Edit</span>
                <span onClick={() => removeArticle(article.id)} className='text-red underline cursor-pointer'>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Articles