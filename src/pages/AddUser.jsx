import React, { useState } from 'react'

export default function AddUser() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    let users = JSON.parse(localStorage.getItem("allusers")) || []
    users.push({ email, password })
    localStorage.setItem("allusers", JSON.stringify(users))
    alert("User Added")
  }

  return (
    <form onSubmit={submitHandler}>
      <h3>Add User</h3>
      <input className="form-control mb-2" placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)} />
      <input className="form-control mb-2" placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)} />
      <button className="btn btn-success">Add</button>
    </form>
  )
}
