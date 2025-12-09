import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../Style/pass.css"
import Cookie  from 'js-cookie';
const ChangePass = () => {
  const [currPass, setCurrPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confPass, setConfPass] = useState("")
  const [err, setErr] = useState("")
  const [isEmpty, setIsEmpty] = useState(true)
  const [matchpass, setMatchPass] = useState(false)

  useEffect(() => {
    if (currPass !== "" && newPass !== "" && confPass !== "") {
      setIsEmpty(false);
      if (newPass !== confPass) {
        setErr("!New password and Confirm Password must be the same");
        setMatchPass(false)
      } else {
        setErr("");
        setMatchPass(true)
      }
    } else {
      setIsEmpty(true);
    }
  }, [currPass, newPass, confPass]);

  const submit = async () => {
    const userId =   Cookie.get("userId")
    try {
      const res = await axios.post(`/api/profile/changePass`, { newPass, currPass,userId }) 
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='change'>
      <h1>Change Password</h1>
      <div className='pass'>
        <span>current Password</span>
        <input
          type="password"
          onChange={(e) => setCurrPass(e.target.value)}
        />
        <span>new Password</span>
        <input
          type="password"
          onChange={(e) => setNewPass(e.target.value)}
        />
        <span>confirm Password</span>
        <input
          type="password"
          onChange={(e) => setConfPass(e.target.value)}
        />
      </div>
      <button
        disabled={isEmpty || !matchpass}
        onClick={submit}
        style={{ backgroundColor: isEmpty || !matchpass ? "gray" : "rgb(87, 87, 244)" }}
      >submit
      </button>
      <span style={{ color: "red" }}>{err}</span>
    </div>
  )
}

export default ChangePass
