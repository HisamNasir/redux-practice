import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
      dispatch(addToCart(product));
    };
  
    const renderStars = () => {
      const rating = product.rating.rate;
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        const starClass =
          rating >= i
            ? 'text-amber-500'
            : 'text-gray-300';
        stars.push(<span key={i} className={`text-xl ${starClass} pr-[1px]`}>★</span>);
      }
      return stars;
    };
  

  return (
    <div className="mx-auto w-full bg-white dark:bg-gray-800 relative rounded-lg shadow-lg p-3">
    <div className=" w-full flex justify-center">
      <img className="h-40 m-2" src={product.image} alt={product.title} />
    </div>
      <h3 className=" text-lg font-semibold">{product.title}</h3>
      <p><span className=" text-sm">Price:</span> ${product.price}</p>
      <p> {renderStars()} <span className=" text-sm">{product.rating.count} reviews</span></p>
      <div className="w-full flex justify-end items-end absolute bottom-3 right-2">
      <button className=" font-semibold tracking-wide shadow-md shadow-black p-2 flex bg-amber-500  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-lg gap-2" onClick={handleAddToCart}>Add to Cart</button>

      </div>
    </div>
  );
};

export default ProductCard;
