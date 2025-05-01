import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

const UpdateRead = () => {
  let [fruitsArray, setFruitsArray] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map((myFileId) => {
        return {
          ...myData[myFileId],
          fruitId: myFileId,
        };
      });
      setFruitsArray(temporaryArray);
    } else {
      alert("No data available");
    }
  };
  const deletefruit = async (fruitIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits" + fruitIdParam);
    await remove(dbRef)
      .then(() => {
        alert("Fruit deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Error deleting fruit: " + error.message);
      });
  };

  return (
    <div>
      <h1>UPDATED READ</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitsArray.map((fruit, index) => {
          return (
            <li key={index}>
              {fruit.fruitsName} - {fruit.fruitsColor}-{fruit.fruitsTaste}:
              {fruit.fruitId}
              <button
                className="button1"
                onClick={() => navigate(`/updatewrite/${fruit.fruitId}`)}
              >
                Update
              </button>
              <button
                className="button1"
                onClick={() => deletefruit(fruit.fruitId)} //
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <button className="button1" onClick={() => navigate("/")}>
        Go Homepage
      </button>
      <br />
      <button className="button1" onClick={() => navigate("/read")}>
        {" "}
        Go Read Page
      </button>
    </div>
  );
};

export default UpdateRead;
