import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import api from '@/http.js'

const ArticleDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [article, setArticle] = useState({
    title: '',
    content: [],
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
      const article = {
        ...data,
        content: JSON.parse(data.content)
      }

      setArticle(article)
    } catch (error) {
      console.error(error)
    }
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

  const handleChange = (key, event) => {
    if (key !== 'content') {
      setArticle({
        ...article,
        [key]: event.target.value
      })
    } else {
      const { e, index } = event
      const contentKey = event.type === 'image' ? 'url' : 'content'
      const content = article.content

      content[index] = {
        ...content[index],
        [contentKey]: e.target.value
      }

      setArticle({
        ...article,
        content: content
      })
    }
  }

  function addBlock(type) {
    const payload = {
      type: type
    }

    if (type === 'image') {
      payload.url = ''
    } else {
      payload.content = ''
    }

    setArticle({
      ...article,
      content: [
        ...article.content,
        payload
      ]
    })
  }

  function removeBlock(index) {
    const content = article.content
    content.splice(index, 1)

    setArticle({
      ...article,
      content: content
    })
  
  }

  useEffect(() => {
    fetchCategories()
    if (id) {
      fetchArticle()
    }
  }, [])

  return (
    <div>
      <div className='flex items-center mb-10'>
        <h1 className='page--title'>{ id ? 'Article Details' : 'Create New Article' }</h1>
      </div>
      
      <div className='grid grid-cols-12 w-full'>
        <div className='col-span-6'>
          <div className='mb-4'>
            <label className='mb-1 block w-full text-sm'>Title</label>
            <input
              className='w-full'
              type="text"
              value={article.title}
              onChange={(e) => handleChange('title', e)}
            />
          </div>

          <div className='mb-4'>
            <label className='mb-1 block w-full text-sm'>Category</label>
            <select
              className='w-full'
              value={article.category_id}
              onChange={(e) => handleChange('category_id', e)}
              >
              {categories.map(({ id, name }, index) => <option key={index} value={id}>{name}</option>)}
            </select>
          </div>

          <div className='mb-4'>
            <label className='mb-1 block w-full text-sm'>Content</label>
            <div className='rounded-lg bg-gray-100 p-4'>
              {article.content.map((block, index) => {
                if (block.type === 'text') {
                  return (
                    <li
                      key={index}
                      className="item list-none mb-6 flex flex-col">
                      <label className='mb-1 block w-full'>Text</label>
                      <textarea
                        rows={5}
                        key={`text-${index}`}
                        className="block w-full"
                        value={block.content}
                        onChange={(e) => handleChange('content', {
                          e,
                          type: 'text',
                          index
                        })}
                      />
                      <label onClick={() => removeBlock(index)} className='text-red underline cursor-pointer mt-1 inline-block text-sm text-right'>delete</label>
                    </li>
                  )
                } else if (block.type === 'image') {
                  return (
                    <li
                      key={index}
                      className="item list-none mb-6 flex flex-col">
                      <label className='mb-1 block w-full'>Image URL</label>
                      <input
                        key={`image-${index}`}
                        className="block w-full mb-2"
                        value={block.url}
                        onChange={(e) => handleChange('content', {
                          e,
                          type: 'image',
                          index
                        })}
                      />
                      {block.url ? <img className='w-full object-contain block' src={block.url} alt="image" /> : null}
                      <label onClick={() => removeBlock(index)} className='text-red underline cursor-pointer mt-1 inline-block text-sm text-right'>delete</label>
                    </li>
                  )
                } else {
                  return (
                    <label key={index}>None</label>
                  )
                }
              })}
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <button onClick={() => addBlock('text')}>Add Text</button>
            <button onClick={() => addBlock('image')}>Add Image</button>

            <button className='ml-auto' onClick={() => saveArticle()}>{id ? 'Update Article' : 'Save Article'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails