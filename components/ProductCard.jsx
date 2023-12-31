import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/features/cartSlice";
import { FaCartArrowDown } from "react-icons/fa";
import Image from "next/image";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
  dispatch(addToCart(product));
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  storedCart.push(product);
  localStorage.setItem('cart', JSON.stringify(storedCart));
  console.log('Added to cart:', product);
};

  const renderStars = () => {
    const rating = product.rating.rate;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = rating >= i ? "text-amber-500" : "text-gray-300";
      stars.push(
        <span key={i} className={`text-xl ${starClass} pr-[1px]`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="mx-auto w-full flex flex-col justify-between bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3">
      <a href={`/product/${product.id}`}>
      <div className="h-60 flex  justify-center bg-white rounded-t-lg items-center">

        <Image width={200} height={200} className=" h-full w-auto m-2 rounded-t-lg" src={product.image} alt='Product Image' />


      </div>
      <div className="w-full flex flex-col space-y-2 relative justify-end">
      <div>
      <h3 className=" text-lg font-semibold">{product.title}</h3>
      <p>
        <span className=" text-sm">Price:</span> ${product.price}
      </p>
      <p>
        {" "}
        {renderStars()}{" "}
        <span className=" text-sm">{product.rating.count} reviews</span>
      </p>
      </div>
      </div></a>
        <button
          className=" font-semibold  tracking-wide shadow-md shadow-black p-2 flex bg-sky-600 text-white hover-bg-sky-700  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-lg gap-2"
          onClick={handleAddToCart}
        >
          <FaCartArrowDown/>Add to Cart
        </button>
    </div>
  );
};

export default ProductCard;
