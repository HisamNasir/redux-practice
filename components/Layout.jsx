import React from 'react';
import Navbar from './Navbar';
import CartFooter from './CartFooter';

const Layout = (props) => {
  return (
    <div className='w-full'>
      <div className=' h-[62px]'>
      <Navbar />

      </div>
      <div className='flex justify-center'>
      <div className='h-[calc(100vh-124x)] container p-2 '>
      {props.children}
      </div>
      </div>
      <div className='h-[62px]'>
        
      </div>
    </div>
  );
};

export default Layout;