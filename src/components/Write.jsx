import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
const Write = () => {
  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  let [inputValue3, setInputValue3] = useState("");
  const navigate = useNavigate();
  const saveData = () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "nature/fruits"));
    set(newDocRef, {
      fruitsName: inputValue1,
      fruitsColor: inputValue2,
      fruitsTaste: inputValue3,
    })
      .then(() => {
        alert("data saved successfully");
      })
      .catch((error) => {
        alert("error:", error.message);
      });
  };
  return (
    <div>
      <h1>Write Section</h1>
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
      <input type="text" onChange={(e) => setInputValue3(e.target.value)} />
      <br />
      <button onClick={saveData}>Save Data</button>
      <button className="button1" onClick={() => navigate("/updateread")}>
        Upadte Read
      </button>
      <br />
      <button className="button2" onClick={() => navigate("/read")}>
        Go Read Page
      </button>
    </div>
  );
};

export default Write;
