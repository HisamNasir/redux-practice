import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";
import Image from "next/image";
const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
  dispatch(addToCart(product));
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  storedCart.push(product);
  localStorage.setItem('cart', JSON.stringify(storedCart));
  console.log('Added to cart:', product);
};
  return (
    <div>
      <Image width={200} height={200} src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>Ratings: {product.rating.rate} ({product.rating.count} reviews)</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductDetail;
