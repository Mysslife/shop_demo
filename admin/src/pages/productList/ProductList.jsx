import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/apiCalls";
import { useEffect } from "react";
import { deleteProduct } from "../../redux/apiCalls";

export default function ProductList() {
  // REDUX:
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  // console.log(products.products);

  // FUNCTION + REDUX:
  const handleClick = (id) => {
    deleteProduct(dispatch, id);
  };

  // USE EFFECT:
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 180 },
    {
      field: "price",
      headerName: "Price",
      width: 200,
    },
    {
      field: "size",
      headerName: "Size",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/product/${params.row._id}`,
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              onClick={() => handleClick(params.row._id)}
              className="productListDelete"
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id} //-> khi thay ?????i tr?????ng ID -> _id th?? ph???i th??m thu???c t??nh getRowId n??y v?? b???ng m???c ?????nh nh???n ID l?? gi?? tr??? m???c ?????nh, n???u thay ID -> _id th?? ph???i set l???i ????? b???ng hi???u l???y gi?? tr??? _id thay th??? cho ID.
      />
    </div>
  );
}
