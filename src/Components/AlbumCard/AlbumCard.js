import React from "react";
import styles from "./albumCard.module.css";

const AlbumCard = ({ album, setEditId }) => {
  const link =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ssCRbGgWZN5MEQ0W6ZfkiRvfvp91-Y-rUraJWKaj8kA9oztocK1AIhuy5Ye6OvtK2p4&usqp=CAU";

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log("data", data));
  };
  const handleEdit = (id) => {
    setEditId(id);
  };
  return (
    <>
      <div className={styles.cardCont}>
        <div className={styles.albumCard}>
          <div className={styles.imgCont}>
            <img src={link} alt="album image" />
            <div className={styles.buttonCont}>
              <button onClick={() => handleDelete(album.id)}>Delete</button>
              <button onClick={() => handleEdit(album.id)}>Edit</button>
            </div>
          </div>
        </div>
        <div className={styles.title}>{album.title}</div>
      </div>
    </>
  );
};

export default AlbumCard;
