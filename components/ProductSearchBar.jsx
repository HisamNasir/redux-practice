import React, { useState } from 'react';
const ProductSearchBar = ({ products, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filteredProducts);
  };
  return (
    <div className="flex items-center py-4">
      <input
        className='rounded-l-lg w-full shadow-md focus:outline-none shadow-black text-sm p-2 flex items-center '
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by product name"
        value={searchQuery}
        type="text"
      />
      <button className='font-semibold shadow-md shadow-black tracking-wide p-2 flex bg-amber-500  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-r-lg ' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ProductSearchBar;
