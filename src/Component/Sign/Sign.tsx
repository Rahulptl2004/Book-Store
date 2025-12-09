"use client";
import React, { useEffect, useState } from 'react'
import '../style/sigfn.css'
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

const Sign = ({ onSubmit }: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("")
  const [name, setName] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  // const route = useRouter();

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const data = {
      name: name,
      email: email,
      // mobile:mobile,
      password: password
    };
    try {
      const response = await axios.post(`/api/user/sign`, data);
      const userdata = response.data;

      if (userdata.success && userdata.error) {
        setError(userdata.error);
        return;
      }
      if (userdata.success) {
        setMessage(userdata.message);

        setTimeout(() => {
          // route.push("./login");
          onSubmit("login")
        }, 1000)
      }
      // console.log(response);

      const users = await axios.get(`/api/user/sign`);
      console.log("All Users:", users.data, data)
      users.data.data.map((i: any) => {
        console.log(i.email)
      });
    } catch (err) {
      console.log("somethig wrong", err)
    };
  }


  useEffect(() => {
    if (name !== "" && email !== "" && password !== "" && password === conpass && agree) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [name, email, password, conpass, agree])

  return (
    <div className='sign'>
      <form onSubmit={handlesubmit}>
        <input type="text" value={name}
          onChange={(e) => setName(e.target.value)} placeholder='Enter name' />

        <input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />

        {/* <input type="number" value={mobile}
          onChange={(e) => setMobile(e.target.value)} placeholder='Enter Number' /> */}

        {/* <input type="text" value={address}
          onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' /> */}

        <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />

        <input type="password" value={conpass}
          onChange={(e) => setConpass(e.target.value)} placeholder='Conform password' />
        <div className="checkbox">

          <input
            type="checkbox"
            onChange={() => setAgree(!agree)} />
          <label>
            I agree to the <a href="">Terms & Conditions</a>
          </label>
        </div>
        <button type='submit' className='sbtn'
          disabled={isEmpty}
          style={{
            backgroundColor: "rgb(87, 87, 244)",
            cursor: isEmpty ? "not-allowed" : "pointer"
          }}>SignUg</button>
        <div>
          {message && <span>{message}</span>}
          {error && <span>{error}</span>}
        </div>
      </form>
    </div>
  )
}

export default Sign