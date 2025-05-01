import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";

const UpdateWrite = () => {
  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  let [inputValue3, setInputValue3] = useState("");
  const navigate = useNavigate();
  const { firebaseId } = useParams(); // Correctly destructure the parameter

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "nature/fruits/" + firebaseId);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const targetData = snapshot.val();
        setInputValue1(targetData.fruitsName);
        setInputValue2(targetData.fruitsColor);
        setInputValue3(targetData.fruitsTaste); // Fixed to set fruitsTaste
      } else {
        alert("No data available");
      }
    };
    if (firebaseId) {
      fetchData();
    }
  }, [firebaseId]);

  const overwriteData = () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "nature/fruits/" + firebaseId);
    set(newDocRef, {
      fruitsName: inputValue1,
      fruitsColor: inputValue2,
      fruitsTaste: inputValue3,
    })
      .then(() => {
        alert("Data saved successfully");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div>
      <h1>UPDATE</h1>
      <input
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={inputValue3}
        onChange={(e) => setInputValue3(e.target.value)}
      />
      <br />
      <button onClick={overwriteData}>Update</button>
      <button className="button1" onClick={() => navigate("/updateread")}>
        Update Read
      </button>
      <br />
      <button className="button2" onClick={() => navigate("/read")}>
        Go Read Page
      </button>
    </div>
  );
};

export default UpdateWrite;
