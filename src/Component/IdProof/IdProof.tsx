"use client";
import React, { useEffect, useState } from "react";
import "../Style/idproof.css";
import Cookie from "js-cookie";
import axios from "axios";

const IdProof = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [idProof, setIdProof] = useState("");
    const [idNum, setIdNum] = useState("");
    const [name, setName] = useState("");
    
    useEffect(() => {
        const userIds = Cookie.get("userId") as string
        // console.log(Cookie.get("userId"))
        setUserId(userIds);
        getData();
        console.log("userId",userId)
    }, []);

    const data = {
        name, idNum, idProof,userId
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Submitting data:", userId  )
        if (userId) {
            
            try {
                const res = await axios.post(`/api/profile/idProof`, data);
            } catch (err) {
                console.error(err);
                alert("Error saving ID Proof");
            }
        }
    };

    const getData = async () => {
        try {
            const res = await axios.get(`/api/profile/account`);
            setUser(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mainId">
            <div className="all-form">
                <div className="header">
                    <h1>Personal Information</h1>
                    <div className="select-file">
                        <select onChange={(e) => setIdProof(e.target.value)} value={idProof}>
                            <option value="">Select Document Type</option>
                            <option value="PAN">PAN</option>
                            <option value="AADHAR">Aadhar</option>
                            <option value="DRIVING">Driving License</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{idProof ? `${idProof} Card Number` : "ID Number"}</label>
                        <input
                            value={idNum}
                            onChange={(e) => setIdNum(e.target.value)}
                            type="text"
                        />
                    </div>

                    <div>
                        <label>Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </div>

                    <div className="file">
                        <label>Choose file</label>
                        <input type="file" />
                    </div>

                    <p className="text">
                        <input type="checkbox" />
                        <span className="texs">
                            I hereby declare that the {idProof || "ID"} furnished above is
                            correct and belongs to me, registered as an account holder with
                            www.bookstore.com. I further declare that I shall be solely
                            responsible for any false declaration.
                        </span>
                    </p>

                    <div className="boton">
                        <button type="submit">Submit</button>
                        <button type="button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IdProof;
