import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, UserContext } from '../../context/userContext/userContext'

enum Categories {
    ANIME = "anime",
    TRAVEL = "travle"
}

interface FormDataState {
    email: string,
    name: string,
    category: Categories
}

const initialForm: FormDataState ={
    email: "",
    name: "",
    category: Categories.ANIME
}

export const HomePage: React.FC = () => {
    const [formData, setFormData] = useState<FormDataState>(initialForm)
    const {email, name, category}: FormDataState = formData
    const {userState, userDispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const handleSubmit = (e:React.SyntheticEvent)=>{
        e.preventDefault()
        getUser({email, name}, userDispatch)
        navigate(`/${category}`)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>|React.FormEvent<HTMLSelectElement>)=>{
        setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value})
    }
  return (
    <div>
        <div>
            Leader board
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder='name'name='name' value={name} onChange={handleChange}/>
                <input placeholder='email'name='email' value={email} onChange={handleChange}/>
                <select name='category' value={category} onChange={handleChange}>
                    <option>anime</option>
                    <option>travel</option>
                </select>
                <input type="submit" placeholder='Go!'/>
            </form>
        </div>
    </div>
  )
}
