import "./newProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [arrValues, setArrValues] = useState([]); //size, colors, categories
  const formRef = useRef();

  // REDUX:
  const dispatch = useDispatch();

  // FUNCTION:
  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleArrValues = (e) => {
    const value = e.target.value.split(", ");
    setArrValues((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(fileName);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;

    //       default:
    //         return;
    //     }
    //   },
    //   (error) => {},
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       const product = { ...inputs, ...arrValues, img: downloadURL };
    //       addProduct(dispatch, product);

    //       alert("Added Successfully!");
    //       formRef.current.reset();
    //     });
    //   }
    // );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" ref={formRef}>
        <div className="addProductItem">
          <label>Image</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            name="file"
            type="file"
            id="file"
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Product name"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            onChange={handleChange}
            name="desc"
            type="text"
            placeholder="Product description"
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            onChange={handleChange}
            name="price"
            type="number"
            placeholder="Product price"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            onChange={handleArrValues}
            name="categories"
            type="text"
            placeholder="women, man, t-shirt, cool, autumn, ...."
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            onChange={handleArrValues}
            name="size"
            type="text"
            placeholder="S, M, L, ...."
          />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input
            onChange={handleArrValues}
            name="color"
            type="text"
            placeholder="Black, White, Yellow, Green, ...."
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select onChange={handleChange} name="inStock">
            <option defaultChecked>Your choice</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </form>
      <button onClick={handleClick} className="addProductButton">
        Create
      </button>
    </div>
  );
}
