import Layout from '@/components/Layout';
import Image from 'next/image';
import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div>
      <Image width={300} height={300} src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate}</p>
    </div>
  );
};

export default ProductDetail;
