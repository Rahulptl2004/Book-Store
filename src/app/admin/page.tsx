"use client";
import React, { useState } from 'react'
import AdminBook from '@/src/components_temp/AdminBook/AdminBook';
import '../../components_temp/style/admin.css'

const page = () => {
    const [current, setCurr] = useState("Books");
    let currCompo;
    if (current === "Books") {
        currCompo = < AdminBook />;
    }
    else if (current === "Address") {
  }

    return (
        <div className='admin'>
            <div className='sidebar-Book'>
                    <div className="profileimg">
                    <img src="../../images.png" alt="Profile" style={{ height: "50px" }} />
                    <h1>ADMIN</h1>
                    </div>
                <div className="section">
                    <h1></h1>
                    <ul>
                        <li><button onClick={() => setCurr("Books")}>Manage Book </button></li>
                           <li><button onClick={() => setCurr("Address")}>Manage</button></li>
                    </ul>
                </div>
            </div>
            <div className='side'>
                {currCompo}

            </div>
        </div>
    )
}

export default page
