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
        className='rounded-l-lg w-full  focus:outline-none border text-sm p-2 flex items-center '
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by product name"
        value={searchQuery}
        type="text"
      />
      <button className='font-semibold  tracking-wide p-2 flex bg-sky-600 text-white hover-bg-sky-700  hover:bg-opacity-80  text-sm items-center md:text-sm rounded-r-lg ' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ProductSearchBar;
