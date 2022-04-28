
  import { MdAddShoppingCart } from 'react-icons/md';
  import { ProductList } from './styles';
  import { useCart } from '../../hooks/useCart';
  import { formatPrice } from '../../util/format';
  import { Product } from '../../types';


  export interface ProductFormatted extends Product {
    priceFormatted: string;
  }

  interface CartItemsAmount {
    [key: number]: number;
  }

  const Home = (): JSX.Element => {


    const { addProduct, cart, products, totalAmount } = useCart();

    //const cartItemsAmount = cart.reduce((sumAmount, product) => {
      // TODO
    //}, {} as CartItemsAmount)



    function handleAddProduct(id: number){
      addProduct(id);
    }

    return (
      <ProductList>
        {products.map((item) => (
                <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <strong>{item.title}</strong>
                <span>{formatPrice(item.price)}</span>
                <button
                  type="button"
                  data-testid="add-product-button"
                  onClick={() => handleAddProduct(item.id)}
                >
                  <div data-testid="cart-product-quantity" style={{cursor: 'pointer'}}>
                    <MdAddShoppingCart size={16} color="#FFF"/>
                    {/*cartItemsAmount[item.id] || 0*/}
                  </div>
        
                  <span>ADICIONAR AO CARRINHO</span>
                </button>
              </li>
        ))}
      </ProductList>
    );
  };

  export default Home;
