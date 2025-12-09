'use client'
import { join } from 'path';
import React, { useState } from 'react'
import '../../Component/Style/auth.css'
import Login from '@/src/Component/Login/Login';
import Sign from '@/src/Component/Sign/Sign';
const page = () => {
    const [currCompo, setCurrCompo] = useState("login");

    const onSubmit = (condition: string) => {
        setCurrCompo(condition)
    }

    const onClick = (condition: string) => {
        setCurrCompo(condition)
    }
    return (
        <main>
            <div className='main'>
                <div className='btn' >
                    {/* {
                       currCompo ==='login'?(<button  onClick={() => setCurrCompo("login")}>Login</button>):(<button  onClick={() => setCurrCompo("signup")}>SignUp</button>) 
                    } */}
                    <button onClick={() => setCurrCompo("login")}>Login</button>
                    <button onClick={() => setCurrCompo("signup")}>SignUp</button>

                </div>
                <div className='form'>
                    {
                        currCompo === 'login' ? (
                            <Login />
                        ) : (
                            <Sign onSubmit={onSubmit} />
                        )
                    }
                </div>
            </div>
        </main>
    )
}

export default page