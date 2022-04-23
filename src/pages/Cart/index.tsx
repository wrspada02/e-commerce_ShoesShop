
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
    const { cart, removeProduct, updateProductAmount } = useCart();

    // const cartFormatted = cart.map(product => ({
    //   // TODO
    // }))
    // const total =
    //   formatPrice(
    //     cart.reduce((sumTotal, product) => {
    //       sumTotal += product.price * product.amount
    //     }, 0)
    //   );

    function handleProductIncrement(product: Product) {
      // TODO
    }

    function handleProductDecrement(product: Product) {
      // TODO
    }

    function handleRemoveProduct(productId: number) {
      removeProduct(productId);
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
                  // disabled={product.amount <= 1}
                  // onClick={() => handleProductDecrement()}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                  //disabled={input.value >=item.amount}  
                  //onClick={() => handleProductIncrement()}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{formatPrice(item.price)}</strong>
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
            <strong></strong>
          </Total>
        </footer>
      </Container>
    );
  };

  export default Cart;
