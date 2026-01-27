import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase.js';

export default function Register() {

  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        password: password
      });
      console.log("Document written with ID: ", docRef.id)
      alert("User registered successfully");
      nav("/login");

    } catch (err) {
      console.error("Error adding document: ", err)
      alert("Something went wrong");
    }
  };

  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center bg-light'>
      <form 
        onSubmit={submithandler} 
        className='w-50 text-white p-5 rounded shadow'
        style={{ background: "linear-gradient(135deg, #8d64b6, #48325c)" }}
      >
        <h2 className='text-center text-dark mb-4'>Register User</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-light w-100 fw-bold">
          Register
        </button>
      </form>
    </div>
  );
}
