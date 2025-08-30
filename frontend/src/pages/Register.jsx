import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const navigate = useNavigate(); // 👈 navigate hook

  const [input,setInput] = useState({
    name:"",
    email:"",
    password:"",
    profile:null,
    gender:"male"
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }
  
  function handleFileChange(e) {
    setInput({
      ...input,
      profile:e.target.files[0]
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if(!input.name || !input.email || !input.password || !input.profile){
      alert("please fill all fields")
      return
    }

    const formData = new FormData()
    formData.append("name",input.name)
    formData.append("email",input.email)
    formData.append("password",input.password)
    formData.append("gender",input.gender)
    formData.append("profile",input.profile)
    
    try {+
      await axios.post("http://localhost:70/singUp",formData)
      // ✅ form submit success hone ke baad OTP verify page pe redirect karo
      navigate("/otp-verify", { state: { email: input.email } })  
    } catch (error) {
      console.log("form submit failed:", error)
    }
  }

  return (
    <div>
      {/* Register-form */}
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>

        <div>
          <label>Gender:</label>
          <select name="gender" value={input.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Profile</label>
          <input type="file" name="profile" onChange={handleFileChange}/>
        </div>

        <button type="submit">Register</button>
      </form>

      <Link to="/login">Already have account</Link>
    </div>
  )
}

export default Register
