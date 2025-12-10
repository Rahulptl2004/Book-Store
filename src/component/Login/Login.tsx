"use client"
import React, { useEffect, useState } from 'react'

import '../style/login.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

const Login = () => {
  // Cookie.set("userId", "68ee3f9e855d9713f509e4a4")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();


  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setError(null);
    setMessage(null);

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`/api/user/login`, data);
      console.log(response.data);

      const userData = response.data;
      console.log(response)

      if (userData.seccess && userData.error) {
        setError(userData.error);
        return;
      }
      if (userData.success) {
        setMessage(userData.message);
        Cookie.set("userId", userData.data.id)
        setTimeout(() => {
          router.push("./profile");
          // onSubmit("profile")
        }, 1000)
      }
    } catch (error) {
      console.log("Login failed", error);
      alert("Invalid Email or Password");
    };
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
        <div className="checkbox">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)} />
          <label>
            <a href="">I agree to the Terms & Conditions</a>
          </label>
        </div>
        <button type='submit' className='lbtn'
          style={{
            backgroundColor: "rgb(87, 87, 244)",
            cursor: "pointer"
          }}
        >Login</button>
        <div>
          {message && <span>{message}</span>}
          {error && <span>{error}</span>}
        </div>
      </form>
    </div>
  )
}

export default Login