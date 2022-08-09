import React from "react";
import Axios from "axios";;
// import { useHistory } from "react-router-dom";

const List = () => {
  const [products, setProducts] = React.useState([]);
  // const history = useHistory();

  React.useEffect(() => {
    Axios.get('http://localhost:3000/products')
      .then(response => {
        const { status, message, data } = response.data;
        status === 'success' ? setProducts(data) : alert(message);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return <><h2>Halaman List Product</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {
          products && products.map((product, index) => {
            return <tr key={index}>
              <td>{product.name}</td>
              <td className="center">{product.price}</td>
              <td className="center">{product.stock}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </>
}

export default List;