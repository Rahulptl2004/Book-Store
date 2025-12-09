"use client";
import React, { useEffect, useState } from "react";
// import "../Style/address.css";
import "../style/adminbook.css";
import axios from "axios";
import Cookie from "js-cookie";
const AdminBook = () => {
    const [showDetail, setShowDetail] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [bookId, setBookId] = useState<string | null>(null);

    // const [addressId, setAddressId] = useState<string | null>(null);
    const [key, setKey] = useState<number | undefined>();
    const [title, setTitle] = useState("");
    const [language, setLan] = useState("");
    const [pages, setPages] = useState<string>("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<string>("");
    const [discount, setDiscount] = useState<string>("");
    const [author, setAthour] = useState("");
    const [publish, setPublish] = useState<string>("");
    const [image_link, setImagelink] = useState<string>("");
    const [about, setAbout] = useState("");
    const [rating, setRating] = useState<string>("0")
    // const currBook = showDetail.find((b) => String(b.key) === String(key));



    const userId = Cookie.get("userId");
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`/api/admin/addBook`);
            setShowDetail(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleAdd = () => {
        if (userId) {
            setShowForm(true)
        } else {
            alert("login first")
        }
    }

    const data = {
        title,
        language,
        pages,
        category,
        price,
        discount,
        author,
        publish,
        about,
        image_link,
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            if (isEdit && bookId) {

                await axios.put(`/api/admin/addBook?id=${bookId}`, data);
                // alert("Book updated");
            } else {

                await axios.post(`/api/admin/addBook`, data);
                // alert("Book saved!");
            }

            getData();
            resetForm();

        } catch (err) {
            console.log("Error:", err);
        }
    };


    const handleEdit = (item: any) => {
        setBookId(item.id);
        setTitle(item.title);
        setLan(item.language);
        setPages(item.pages);
        setCategory(item.category);
        setAbout(item.about);
        setAthour(item.author);
        setImagelink(item.image_link);
        setPublish(item.publish);
        setPrice(item.price);
        setDiscount(item.discount);

        setIsEdit(true);
        setShowForm(true);
    }

    const handleCancel = () => {
        setShowForm(false)
        resetForm()
    }

    const handleRemove = async (id: any) => {
        try {
            await axios.delete(`/api/admin/addBook?id=${id}`);
            alert("Book removed!");
            getData();
        } catch (err) {
            console.log(err);
        }
    };
    const resetForm = () => {
        setBookId(null);
        setIsEdit(false);
        setShowForm(false);

        setTitle("");
        setLan("");
        setPages("");
        setCategory("");
        setAbout("");
        setAthour("");
        setImagelink("");
        setPrice("");
        setPublish("");
        setRating("");
        setDiscount("");
    };



    return (
        <div className="address-book">
            <div className="addressbox">
                <h2>Book-store</h2>

                {!showForm && (
                    <div className="add_new" onClick={handleAdd}>
                        <span>+ ADD A NEW BOOK</span>
                    </div>
                )}

                {showForm && (
                    <div className="book-form">
                        <h3>{isEdit ? "EDIT BOOK" : "+ ADD A NEW BOOK"}</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="formrow">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                                <input type="text" value={language} onChange={(e) => setLan(e.target.value)} placeholder="Language" />
                            </div>

                            <div className="formrow">
                                <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="Pages" />
                                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                            </div>

                            <div className="formrow">
                                <input type="text" value={author} onChange={(e) => setAthour(e.target.value)} placeholder="Author" />

                                <input  type="text" value={image_link} onChange={(e) => setImagelink(e.target.value)}
                                    placeholder="image_link"/>
                            </div>

                            <div className="formrow">
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

                                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount" />

                            </div>
                            <div className="formrow">
                                <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" />
                            </div>
                            <div className="formrow">
                                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="About" />

                                <input type="number" value={publish} onChange={(e) => setPublish(e.target.value)} placeholder="Published Year" />
                            </div>

                            <div className="formrow-form">
                                <button type="submit" className="submitbtn" onClick={handleSubmit}>
                                    submit
                                </button>

                                <button type="button" className="cancelbtn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <div className="saved-book">
                    {showDetail && showDetail.length > 0 ? (
                        showDetail.map((item: any, i) => (
                            <div key={i} className="saved-cards">
                                <div className="images">
                                    {item.image_link ? (
                                        <img src={item.image_link} alt="image" />
                                    ) : (
                                        <img src="/no-image.png" alt="no image" />
                                    )}
                                </div>
                                <div className="saved-headers">
                                    <h1>{item.title}</h1>
                                    <p>{item.about}</p>
                                    <div className='price'>
                                        <span className="curr-price">
                                            ₹{item.price - (item.price * item.discount) / 100}
                                        </span>
                                        <span className="total-price">₹{item.price}</span>
                                        <span className="discount">({item.discount}% OFF)</span>
                                    </div>
                                    <span>You save <b>₹{(item.price * item.discount) / 100}</b></span>
                                    <div className="edit-removes">
                                        <span onClick={() => handleEdit(item)} className="edits">
                                            Edit
                                        </span>
                                        <span
                                            onClick={() => handleRemove(item.id)}
                                            className="removes"
                                        >
                                            Remove
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No saved addresses yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBook;
