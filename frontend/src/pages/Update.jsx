import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState({ title: '', paragraph: '' })

  // Fetch existing note data
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')

    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/todo/show/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        setNote({
          title: res.data.data.title || "",
          paragraph: res.data.data.paragraph || ""
        })
      } catch (error) {
        console.log('Error fetching note:', error)
      }
    }

    fetchNote()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNote(prev => ({ ...prev, [name]: value }))
  }

  // Handle update
  const handleUpdate = async () => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/update/${id}`,
        note,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/Show')
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#192d51] via-[#1a2540] to-[#0e1528] p-6">

      <h1 className="text-4xl font-bold text-white mb-2">Update To-Do</h1>
      <p className="text-blue-200 mb-8">Modify your note details</p>

      <div className="max-w-2xl bg-[#22375e] border border-blue-900 shadow-xl rounded-2xl p-8 mx-auto">

        {/* Title */}
        <div className="mb-5">
          <label className="block text-blue-200 mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-[#1b2b4a] text-white border border-blue-800
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Paragraph */}
        <div className="mb-6">
          <label className="block text-blue-200 mb-1 font-medium">Paragraph</label>
          <textarea
            name="paragraph"
            value={note.paragraph}
            onChange={handleChange}
            className="w-full p-3 h-32 rounded-xl bg-[#1b2b4a] text-white border border-blue-800
                       resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="w-full py-3 font-semibold text-white bg-teal-600 rounded-xl shadow-lg 
                     hover:bg-teal-700 transition-all"
          >
            Update To-Do
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate('/Show')}
            className="w-full py-3 font-semibold text-white bg-red-600 rounded-xl shadow-lg 
                       hover:bg-red-700 transition-all"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}

export default Update
