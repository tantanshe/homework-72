import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {completeOrder, fetchOrders, selectError, selectIsOrdersLoading, selectOrders} from '../../store/orderSlice';
import {fetchDishes, selectDishes, selectIsDishesLoading} from '../../store/dishesSlice';
import Spinner from '../../components/Spinner/Spinner';
import Admin from './Admin';


const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const isDishesLoading = useAppSelector(selectIsDishesLoading);
  const isOrdersLoading = useAppSelector(selectIsOrdersLoading);
  const error = useAppSelector(selectError);
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchOrders());
  }, [dispatch]);

  const getOrderTotalAmount = (order) => {
    const items = order.cartItems;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total + 150;
  };

  const ordersWithDishes = orders.map((order) => ({
    ...order,
    cartItems: order.cartItems.map((item) => {
      const dish = dishes.find((dish) => dish.id === item.id);
      return {
        ...item,
        title: dish.title,
        price: dish.price,
      };
    }),
  }));

  const handleComplete = (orderId) => {
    dispatch(completeOrder(orderId));
  };

  return (
    <div>
      <Admin/>
      <h1 className="mb-3">Admin Orders</h1>
      {orders.length === 0 &&
        <h2>No orders in the list!</h2>}
      {(isDishesLoading || isOrdersLoading) && <Spinner/>}
      <div className="row">
        {ordersWithDishes.map((order) => (
          <div className="col-md-12 mb-4" key={order.id}>
            <div className="card">
              <div className="card-body">
                <ul className="list-group">
                  {order.cartItems.map((item) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                      <span>{item.title} - {item.price} сом x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2">Delivery: 150 сом</p>
                <h5 className="mt-3">Total Amount: {getOrderTotalAmount(order)} сом</h5>
                <div>
                  <button onClick={() => handleComplete(order.id)} className="btn btn-success mt-3 btn-lg">Complete
                    order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
