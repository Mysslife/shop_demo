import "./newUser.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [gender, setGender] = useState(null);
  const [file, setFile] = useState(null);
  const formRef = useRef();

  // REDUX:
  const dispatch = useDispatch();

  // FUNCTION:
  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            return;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, gender: gender, image: downloadURL };
          addUser(dispatch, user);
          alert("Added Successfully!");
          formRef.current.reset();
        });
      }
    );
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" ref={formRef}>
        <div className="newUserItem">
          <label>Image</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            name="file"
            type="file"
          />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="Minion"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="drunkminion@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="0659746678"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="New York | USA"
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              onChange={(e) => setGender(e.target.value)}
              type="radio"
              name="gender"
              id="male"
              value="male"
            />
            <label htmlFor="male">Male</label>
            <input
              onChange={(e) => setGender(e.target.value)}
              type="radio"
              name="gender"
              id="female"
              value="female"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </form>
      <button onClick={handleCreate} className="newUserButton">
        Create
      </button>
    </div>
  );
}
