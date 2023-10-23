import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { publishProduct } from '@/src/store/features/productSlice';
import Layout from '@/components/Layout';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
const PublishedProducts = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    image: '',
    name: '',
    price: 0,
    stockQuantity: 0,
  });
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const imageFile = files[0];
      setProduct({
        ...product,
        image: imageFile,
        imageName: imageFile.name,
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };  const handlePublish = async (e) => {
    e.preventDefault();
 if (!product.image || !product.name || product.price <= 0 || product.stockQuantity < 100) {
      setError('Please fill in all required fields and ensure stock quantity is at least 100.');
    } else {
      try {
        const fileFormat = product.imageName.split('.').pop();

        const storageRef = ref(
          storage,
          `${currentUser.uid}/${Date.now()}_${product.name}.${fileFormat}`
        );
        const uploadTask = uploadBytesResumable(storageRef, product.image);

        uploadTask.on('state_changed', null, (error) => {
          console.error('Error uploading image: ', error);
          setError('Error uploading image.');
        }, () => {
          getDownloadURL(storageRef).then((downloadURL) => {
            const productRef = collection(db, 'PublishedProducts');
            addDoc(productRef, {
              name: product.name,
              price: product.price,
              stockQuantity: product.stockQuantity,
              image: downloadURL,
              userId: currentUser.uid,
              ratings: {
                stars: 0,
                reviewText: '',
              },
            }).then(() => {
              console.log('Product added with image URL: ', downloadURL);
              setProduct({
                image: '',
                name: '',
                price: 0,
                stockQuantity: 0,
                imageName: '',
              });
              setError('');
            }).catch((error) => {
              console.error('Error adding document: ', error);
              setError('Error adding document.');
            });
          });
        });
      } catch (error) {
        console.error('Error uploading image: ', error);
        setError('Error uploading image.');
      }
    }
  }; return (
    <Layout>
      <div className="bg-gray-100 rounded-lg space-y-4 dark:bg-gray-900 p-4">
        <div className="mt-6">
          <Link href="/settingspage"
            className="p-2 max-w-min flex items-center gap-2  rounded-md  bg-black hover:bg-opacity-40 bg-opacity-20 duration-300 transition-colors"
          >
            <FaArrowLeft /> Settings
          </Link>
        </div>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Publish a New Product</h2>
          </div>
          <form>
            <div className="mt-4">
              <label htmlFor="image" className="block text-gray-600 dark:text-gray-400">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                required
                className="w-full p-2 mt-1 rounded-md  dark:bg-black bg-gray-200 "
              />
            </div>
            <div className="mt-4">
              <label htmlFor="name" className="block text-gray-600 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 mt-1 rounded-md dark:bg-black bg-gray-200 "
              />
            </div>
            <div className="mt-4">
              <label htmlFor="price" className="block text-gray-600 dark:text-gray-400">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
                className="w-full p-2 mt-1 rounded-md dark:bg-black bg-gray-200 "
              />
            </div>
            <div className="mt-4">
              <label htmlFor="stockQuantity" className="block text-gray-600 dark:text-gray-400">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleInputChange}
                required
                className="w-full p-2 mt-1 rounded-md dark:bg-black bg-gray-200 "
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mt-6">
              <button
                onClick={handlePublish}
                className="w-full p-2  bg-black hover:bg-opacity-40 bg-opacity-20 rounded-md  duration-300 transition-colors"
              >
                Publish Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PublishedProducts;
