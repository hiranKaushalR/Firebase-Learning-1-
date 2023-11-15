import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Components/Auth";
import { db, auth, storage } from "./Config/FireBase";
import { ref, uploadBytes } from "firebase/storage"
import {
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  // Movie Input
  const [newMovieTitile, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "Movies");

  async function getMovieList() {
    try {
      const data = await getDocs(movieCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterdData);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteMovie(id) {
    const movieDoc = doc(db, "Movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  }

  async function updateMovieTitle(id) {
    const movieDoc = doc(db, "Movies", id);
    await updateDoc(movieDoc, { Title: updatedTitle });
    getMovieList();
  }

  async function uploadFile () {
    if (!fileUpload) return;
    const filesFolderRef = ref (storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes (filesFolderRef, fileUpload)
    } catch (err) {
      console.error (err)
    }
  }

  useEffect(() => {
    getMovieList();
  }, []);

  async function inputData() {
    try {
      await addDoc(movieCollectionRef, {
        Title: newMovieTitile,
        releaseDate: newReleaseDate,
        wonOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div>
        <Auth />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <form>
          <input
            type="text"
            placeholder="Movie name"
            onChange={(event) => setNewMovieTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Release date"
            onChange={(event) => setNewReleaseDate(Number(event.target.value))}
          />

          <label htmlFor="haveOscar">Is this movie have an Oscar</label>
          <input
            type="checkbox"
            id="haveOscar"
            checked={isNewMovieOscar}
            onChange={(event) => setIsNewMovieOscar(event.target.checked)}
          />
          <button onClick={inputData} type="button">
            Input Data
          </button>
        </form>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h3 style={{ color: movie.wonOscar ? "green" : "red" }}>
              {movie.Title}
            </h3>
            <p>Release Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              type="text"
              placeholder="Change Movie name"
              onChange={(event) => setUpdatedTitle(event.target.value)}
            />
            <button type="button" onClick={() => updateMovieTitle(movie.id)}>
              Change Movie Name
            </button>
          </div>
        ))}
      </div>

      <div>
        <input
          type = "file"
          onChange = {
            (event) => setFileUpload(event.target.files[0])
          }
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
