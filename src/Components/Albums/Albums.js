import React, { useEffect, useRef, useState } from "react";
import styles from "./albums.module.css";
import AlbumCard from "../AlbumCard/AlbumCard";

const Albums = () => {
  const [albumData, setAlbumData] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
  });
  const [editId, setEditId] = useState("");
  const titleRef = useRef();
  const userIdRef = useRef();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((json) => {
        const finalData = json.splice(0, 10);
        setAlbumData(finalData);
      });
  }, []);
  useEffect(() => {
    if (editId) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${editId}`)
        .then((res) => res.json())
        .then((json) => {
          setFormData({ title: json.title, userId: json.userId });
        });
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${editId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formData.title,
          userId: formData.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else {
      fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          userId: formData.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
  };
  return (
    <>
      <div className={styles.formCont}>
        <form onSubmit={handleSubmit}>
          <div>
            <span> User Id : </span>
            <input
              type="text"
              name="userId"
              id="input1"
              ref={userIdRef}
              value={formData.userId}
              onChange={(e) => {
                setFormData({ userId: e.target.value, title: formData.title });
              }}
            />
          </div>
          <div>
            <span> Title : &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input
              type="text"
              name="title"
              id="input2"
              ref={titleRef}
              value={formData.title}
              onChange={(e) =>
                setFormData({ userId: formData.userId, title: e.target.value })
              }
            />
          </div>

          <button className={styles.button}>Add Album</button>
        </form>
      </div>
      <div className={styles.allCardsCont}>
        {albumData.map((album, index) => (
          <div key={index} className={styles.albumsCont}>
            <AlbumCard album={album} setEditId={setEditId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Albums;
