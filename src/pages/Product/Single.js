import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

const Single = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [product, setProducts] = React.useState({
    name: '',
    price: 0,
    stock: 1,
    status: true
  });

  React.useEffect(() => {
    Axios.get(`http://localhost:3000/product/${productId}`)
      .then(response => {
        const { status, message, data } = response.data;
        status === 'success' ? setProducts(data) : alert(message);
      })
      .catch(error => {
        alert(error);
      });
  }, [productId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('yakin ingin menghapus?');
    if (confirm) {
      try {
        const response = await Axios.delete(`http://localhost:3000/product/${id}`);
        const { message } = response.data;
        alert(message);
        history.push('/product');
      } catch (error) {
        alert('Network error');
      }
    }
  }

  return <>
    <h2>Halaman Single Product</h2>
    {
      product &&
      <>
        <div>Name: {product.name}</div>
        <div>Price: {product.price}</div>
        <div>Stock: {product.stock}</div>
        <div>Status: {product.status ? 'on' : 'off'}</div>
        <button onClick={() => handleDelete(product._id)}>delete</button>
      </>
    }
    <button onClick={() => history.push('/product')}> &laquo; Back</button>
  </>
}

export default Single;