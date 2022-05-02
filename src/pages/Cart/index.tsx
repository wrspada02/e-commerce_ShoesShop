
  import {
    MdDelete,
    MdAddCircleOutline,
    MdRemoveCircleOutline,
  } from 'react-icons/md';

  import { useCart } from '../../hooks/useCart';
  import { formatPrice } from '../../util/format';
  import { Container, ProductTable, Total } from './styles';

  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
  }

  const Cart = (): JSX.Element => {
    const { cart, totalAmount, setCart, removeProduct, updateProductAmount } = useCart();

    // const cartFormatted = cart.map(product => ({
    //   // TODO
    // }))
    const total = cart.reduce((sumTotal, product) => {
        sumTotal += product.price * product.amount;
        return sumTotal;
      }, 0);



    function returnDataCart(id : number){
      const newArray = [...cart];
      const positionArray = newArray.findIndex((item) => item.id === id);
      return {
        positionArray,
        newArray
      }
    }

    function handleProductIncrement(product: Product) {
      const { id } = product;
      const dataCart = returnDataCart(id);
      const { newArray, positionArray } = dataCart;
      newArray[positionArray].amount += 1;

      setCart(newArray);
      //updateProductAmount();
    }

    function handleProductDecrement(product: Product){
      const { id } = product;
      const dataCart = returnDataCart(id);
      const { newArray, positionArray } = dataCart;
      newArray[positionArray].amount -= 1;

      setCart(newArray);

      //updateProductAmount();
    }

    function handleRemoveProduct(productId: number) {
      removeProduct(productId);

      //updateProductAmount();
    }

    return (
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
            {cart.map((item) => (
              <tbody key={item.id}>
              <tr data-testid="product">
              <td>
                <img src={item.image} alt={item.title}/>
              </td>
              <td>
                <strong>{item.title}</strong>
                <span>{formatPrice(item.price)}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={item.amount <= 1}
                    onClick={() => handleProductDecrement(item)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    value={item.amount}
                    readOnly={true}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    disabled={ item.amount >= totalAmount[item.id-1].amount }  
                    onClick={() => handleProductIncrement(item)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{formatPrice(item.price * item.amount)}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(item.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          </tbody>
            ))}
        </ProductTable>

        <footer>
          <button type="button">Finalizar pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>{formatPrice(Number(total))}</strong>
          </Total>
        </footer>
      </Container>
    );
  };

  export default Cart;
