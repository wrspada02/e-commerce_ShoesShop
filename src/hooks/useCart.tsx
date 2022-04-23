import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';
import { ProductFormatted } from "../pages/Home/index";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  products: ProductFormatted[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(){
      await api.get('/products')
      .then(response => setProducts(response.data));
    }

    loadProducts();
  }, []);

  const addProduct = async (productId: number) => {
    try {
      const newItem = products.filter((item) => item.id === productId);
      const [{amount, id, image, price, title}] = newItem;
      await setCart([...cart, {
        id: id,
        amount: amount,
        image: image,
        price: price,
        title: title,
      }]);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = async (productID: number) => {
    try {
      const removeItem = cart.findIndex((item) => item.id === productID);
      const newArrayProducts = cart;
      newArrayProducts.splice(removeItem, 1);

      await setCart(newArrayProducts);
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({ productId, amount }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      toast.error('Quantidade solicitada fora de estoque');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, products, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
