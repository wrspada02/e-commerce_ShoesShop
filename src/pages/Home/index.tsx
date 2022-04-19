import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { AxiosResponse } from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  // const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   // TODO
  // }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts(){
      await api.get('/products')
      .then(response => setProducts(response.data));
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    console.log('test');
  }

  return (
    <ProductList>
      {products.map((item) => (
              <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <strong>{item.title}</strong>
              <span style={{alignItems: 'flex-end'}}>R$ {item.price}0</span>
              <button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(item.id)}
              >
                <div data-testid="cart-product-quantity" style={{cursor: 'pointer'}}>
                  <MdAddShoppingCart size={16} color="#FFF"/>
                  {/* {cartItemsAmount[product.id] || 0} */}
                </div>
      
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
      ))}
    </ProductList>
  );
};

export default Home;