import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

const Read = () => {
  let [fruitsArray, setFruitsArray] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setFruitsArray(Object.values(snapshot.val()));
    } else {
      alert("No data available");
    }
  };
  return (
    <div>
      <h1>Read Data</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitsArray.map((fruit, index) => {
          return (
            <li key={index}>
              {fruit.fruitsName} - {fruit.fruitsColor}-{fruit.fruitsTaste}
            </li>
          );
        })}
      </ul>

      <br />
      <button className="button1" onClick={() => navigate("/")}>
        Go Homepage
      </button>
      <br />
      <button className="button2" onClick={() => navigate("/updateread")}>
        {" "}
        Update Read Page
      </button>
    </div>
  );
};

export default Read;
