import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
const ProductCardCover = ({ products }) => {
  return (

      <Carousel
        className="mx-auto w-full  flex flex-col  justify-between bg-white dark:bg-gray-800  rounded-lg shadow-lg p-3"
        showArrows
        infiniteLoop
        autoPlay
        interval={5000}
        showStatus={false}
        showThumbs={false}
      >
        {products.map((product) => (
          <div key={product.id} className="md:flex items-center w-full h-full gap-2 p-8">

              <div className="h-full flex bg-white rounded-lg p-4 items-center">
                <Image
                  width={200}
                  height={200}
                  className=" rounded-t-lg min-w-min"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="text-left space-y-2">
                <h1 className=" font-semibold text-3xl">{product.title}</h1>
                <p className=" text-xl">
                  Price:{" "}
                  <span className=" text-amber-500">${product.price}</span>
                </p>
                <p className=" text-lg ">${product.description}</p>
              </div>

          </div>
        ))}
      </Carousel>
  );
};

export default ProductCardCover;
