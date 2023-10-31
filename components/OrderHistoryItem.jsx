const ProductItem = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details from the 'products' collection
    const productRef = db.collection("products").doc(productId);
    productRef.get().then((doc) => {
      if (doc.exists) {
        setProduct(doc.data());
      }
    });
  }, [productId]);

  return (
    <li>
      {product ? product.title : "Product not found"}
      {/* You can display other product information here */}
    </li>
  );
};
