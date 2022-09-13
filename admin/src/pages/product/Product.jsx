import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const [info, setInfo] = useState(null);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const formRef = useRef();

  // REDUX:
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  );

  // FUNCTION:
  const handleChange = (e) => {
    let value;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      file.img = URL.createObjectURL(file);
    }
    value = e.target.value;

    setInfo({ ...info, [e.target.name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateProduct(dispatch, productId, info);
    formRef.current.reset();
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={
                product.img ||
                "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" ref={formRef}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder={`${product.title}`}
              name="title"
            />
            <label>Description</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Product description"
              name="desc"
            />
            <label>Price</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder={`${product.price}`}
              name="price"
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={
                  product.img ||
                  "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                onChange={handleChange}
                name="img"
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
