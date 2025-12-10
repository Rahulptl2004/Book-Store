"use client";
import React, { useEffect, useState } from 'react'
import '../../component/style/profile.css'
import axios from 'axios';
import Edit from '@/src/component/Edit/Edit';
import Changepass from '@/src/component/ChangePass/ChangePass';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import Logo from '@/src/component/Logout/Logout';
import Address from '@/src/component/Address/Address';
import IdProof from '@/src/component/IdProof/IdProof';
import Login from '@/src/component/Login/Login';
import Wishlist from '@/src/component/Wishlist/Wishlist';

const profile = () => {
  const [userId, setUserID] = useState<any>(null);
  const [current, setCurr] = useState("Edit");
  const router = useRouter();

  // useEffect(() => {
  //   setUserID(Cookie.get("userId") || null)
  // },[])
  useEffect(() => {
  const id = Cookie.get("userId");
  setUserID(id);

  if (!id) {
    router.push("/auth");
  }
}, []);
  let currCompo;
  if (current === "Edit") {
    currCompo = <Edit />;
  } else if (current === "ChangePass") {
    currCompo = <Changepass />;
  } else if (current === "Logout") {
    currCompo = <Logo />
  }
  else if (current === "Address") {
    currCompo = <Address />
  }

  else if (current === "IdProof") {
    currCompo = <IdProof />
  } else if (current === "Wishlist") {
    currCompo = <Wishlist />
  }

  return (
    <div>
      {
        userId ? (
          <div className='profile'>
            <div className="sidebar">
              <div className="sidebar-header">
                <div className="profile-img">
                  <img src="../../images.png" alt="Profile" />
                </div>
                <div className="profile-name">
                  <h3>Rahul Patel</h3>
                </div>
              </div>


              <div className="sidebar-section">
                <h4><i className="fa fa-shopping-bag"></i> My Orders</h4>
                <ul>
                  <li><button onClick={() => setCurr("Orders")}>View Orders</button></li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h4 ><i className="fa fa-user"></i> Account Settings</h4>
                <ul>
                  <li><button onClick={() => setCurr("Edit")}>Profile Information</button></li>
                  <li><button onClick={() => setCurr("Address")}>Manage Addresses</button></li>
                  <li><button onClick={() => setCurr("IdProof")}>PAN Card Information</button></li>
                  <li><button onClick={() => setCurr("ChangePass")}>Change Password</button></li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h4><i className="fa fa-credit-card"></i> Payments</h4>
                <ul>
                  <li><button onClick={() => setCurr("Upi")}>Saved UPI</button></li>
                  <li><button onClick={() => setCurr("Cards")}>Saved Cards</button></li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h4><i className="fa fa-folder-open"></i> My Stuff</h4>
                <ul>
                  <li><button onClick={() => setCurr("Wishlist")}>My Wishlist</button></li>
                  <li><button onClick={() => setCurr("Reviews")}>My Reviews & Ratings</button></li>
                </ul>
              </div>

              <div className="sidebar-section logout">
                <button onClick={() => setCurr("Logout")}>
                  <i className="fa fa-power-off"></i> Logout
                </button>
              </div>
            </div>
            <div className='hello'>
              {currCompo}
            </div>
          </div>) : (
          <div className='loggin'>
        
          </div>
        )
      }
    </div>
  )
}

export default profile