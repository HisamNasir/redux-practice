import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
  return (
    <div className='w-full'>
      <div className=' h-[62px]'>
      <Navbar />

      </div>
      <div className='flex justify-center'>
      <div className='h-[calc(100vh-62px)] container p-2 '>
      {props.children}
      </div>
      </div>
    </div>
  );
};

export default Layout;