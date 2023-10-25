import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>Ratings: {product.rating.rate} ({product.rating.count} reviews)</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductDetail;
