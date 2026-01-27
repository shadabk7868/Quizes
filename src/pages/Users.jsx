import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("allusers")) || []
    setUsers(data)
  }, [])

  return (
    <div>
      <h3>Users List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.email}</td>
              <td>
                <NavLink to={`/dashboard/updateuser/${i}`} className="btn btn-sm btn-info">
                  Edit
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
