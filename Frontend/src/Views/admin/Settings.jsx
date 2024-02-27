import React, { useEffect, useState } from "react";
import axios from "axios";
const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Poppins",
    color: "#0E050F",
  },
  image: {
    height: "13rem",
    cursor: "pointer",
    borderRadius: "0.5rem"
  },
  imageBox: {
    borderRadius: '0.5rem',
    backgroundColor: '#0E050F',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3rem"
  },
  header: {
    marginBottom: "0.5rem",
  },
  element: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  Buttons: {
    margin: "0",
    padding: "0.15rem",
    border: "none",
    color: "white",
    backgroundColor: "#0E050F",
    borderRadius: "0.2em",
    fontFamily: "Poppins",
    fontSize: "0.8rem",
  },
  input: {
    width: "15rem",
    height: "1rem",
    marginRight: "0.5rem",
  },
};
export default function Settings() {
  const [areas, setAreas] = useState(0);
  const [urls, setUrls] = useState([]);
  const [activeUrl, setActiveUrl] = useState(0);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(1);

  const handleSet = async () => {
    console.log(urls);
    ((areas > 20))
      ? alert("Data provided is Invalid")
      : await axios
          .post(`http://localhost:8080/richmenu1/${selectedImage}`, { uris: urls })
          .then(({ data }) =>
            axios
              .post(`http://localhost:8080/richmenu2/${areas}`, {
                menuId: data.richMenuId,
                imageName: selectedImage,
              })
              .then((response) =>
                axios
                  .post("http://localhost:8080/richmenu3", {
                    menuId: data.richMenuId,
                  })
                  .then(({data}) => console.log(data), alert('Richmenu Updated Successfully!'), setAreas(0), setUrls([]), setActiveUrl(0), setImages([]), setSelectedImage(1))
                  .catch((err) => console.log(err))
              )
              .catch((err) => console.log(err))
          )
          .catch((err) => console.log(err));
  };

  const setUrlFunc = (uri) => {
    let uris = urls;
    uris[activeUrl] = uri;
    setUrls(uris);
  };

  const setActive = () => {
    const input = document.getElementById("urlInput");
    input.value = "";
    let active = activeUrl + 1;
    setActiveUrl(active);
  };

  useEffect(() => {
    console.log(selectedImage);
    axios
      .get(`http://localhost:8080/images/${areas}`)
      .then(({ data }) => setImages(data))
      .catch((err) => console.log(err));
  }, [areas]);

  return (
    <div style={styles.main}>
      <h2 style={styles.heading}>Set up Rich menus</h2>
      <div>
        <label style={styles.heading}>Total Clickable Areas</label>
      </div>
      <div style={styles.element}>
        <input
          type="number"
          onChange={(e) => (
            (e.target.value <= 20 ? (setAreas(e.target.value), setUrls(new Array(areas).fill(""))) : alert('Areas cannot exceed 20'))
          )}
        />
      </div>

      {images.length > 0 && areas > 0 && (
        <div style={styles.main}>
          <div style={styles.header}>
            <label style={styles.heading}>Choose the Configuration</label>
          </div>
          <div style={styles.element}>
            {images.map((image, index) => (
              <div style={((index+1) === selectedImage) ? styles.imageBox : null} key={index}>
                <img
                key={index}
                onClick={() => setSelectedImage(index + 1)}
                style={styles.image}
                src={`../../../public/Images/Areas-${areas}/${image}`}
                />
                <span style={{color: "white", fontFamily: "poppins", marginBottom: "0.4rem"}}>{`Type ${index+1}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeUrl < areas && areas > 0 && (
        <div style={styles.main}>
          <div>
            <label style={styles.heading}>Area {activeUrl + 1}'s url</label>
          </div>
          <div style={styles.element}>
            <input
              style={styles.input}
              id="urlInput"
              type="text"
              onChange={(e) => setUrlFunc(e.target.value)}
            />
            <button style={styles.Buttons} onClick={setActive}>
              Set Link
            </button>
          </div>
        </div>
      )}

      {areas > 0 && (
        <button style={styles.Buttons} onClick={handleSet}>
          Set Menu
        </button>
      )}
    </div>
  );
}
