"use client"
import axios from 'axios';
import "../style/account.css"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Edit = () => {
  const [getUser, setGetUser] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false)
  const [postEmail, setPostEmail] = useState("")
  const [postName, setPostName] = useState("")
  const [postMobile, setPostMobile] = useState("")
  const [postAdd, setPostAdd] = useState("")
  const router = useRouter();


  const getData = async () => {
    try {
      const respo = await axios.get(`/api/profile/account`)
      setGetUser(respo.data.data)
      setPostEmail(respo.data.data.email)
      setPostName(respo.data.data.name)
      setPostMobile(respo.data.data.mobile)
      setPostAdd(respo.data.data.address)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    if (isEdit) {
      try {
        await axios.put(`/api/profile/edit`, {
          email: postEmail,
          name: postName,
          mobile: postMobile,
          address: postAdd
        });
        alert("User updated successfully!");
      } catch (err) {
        console.log(err);
      }
    }
    setIsEdit(!isEdit);
  };


  useEffect(() => {
    getData()
  }, [])


  return (
    <div className='account'>
      <h1>{isEdit ? 'This is edit page' : 'Account Details'}</h1>
      <div className="btnn">
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: isEdit ? "rgb(87, 87, 244)" : "gray" }}
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="details">
        <b>Email:</b>
        {isEdit ? (
          <input type="email"
            value={postEmail}
            onChange={(e) => setPostEmail(e.target.value)}
            placeholder='Update your Email'
            disabled={true}
          />
        ) : (
          <span>{getUser?.email || "loading"}</span>
        )}

        <b>Name:</b>
        {isEdit ? (
          <input type="text"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            placeholder='Update your Name'
          />
        ) : (
          <span>{getUser?.name || "loading"}</span>
        )}

        <b>Mobile:</b>
        {isEdit ? (
          <input type="number"
            value={postMobile}
            onChange={(e) => setPostMobile(e.target.value)}
            placeholder='Update your number'
          />
        ) : (
          <span>{getUser?.mobile || "loading"}</span>
        )}

        <b>Address:</b>
        {isEdit ? (
          <input type="text"
            value={postAdd ?? ""}
            onChange={(e) => setPostAdd(e.target.value)}
            placeholder='Update your address'
          />
        ) : (
          <span>{getUser?.address || "loading"}</span>
        )}
      </div>


    </div>
  )
}

export default Edit
