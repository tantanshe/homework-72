import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchDishes, selectDishes, selectError, selectIsDishesLoading} from '../../store/dishesSlice';
import {
  addToCart,
  clearCart,
  placeOrder,
  removeFromCart,
  selectCart,
} from '../../store/orderSlice';
import Spinner from '../../components/Spinner/Spinner';
import {Button, Modal} from 'react-bootstrap';

const ClientDishList = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const isLoading = useAppSelector(selectIsDishesLoading);
  const error = useAppSelector(selectError);
  const cart = useAppSelector(selectCart);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleAddToCart = (id: string) => {
    dispatch(addToCart(id));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(placeOrder(cart));
    dispatch(clearCart());
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const cartItems = cart.map(item => {
    const dish = dishes.find(dish => dish.id === item.id);
    return {
      ...item,
      title: dish.title,
      price: dish.price,
    };
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-center mb-3">Welcome to our pizzeria!</h1>
      {error && <h2>Error loading dishes</h2>}
      {isLoading && <Spinner/>}
      <div className="row">
        {dishes.map(dish => (
          <div className="col-md-4 mb-4" key={dish.id} onClick={() => handleAddToCart(dish.id)}
               style={{cursor: 'pointer'}}>
            <div className="card h-100">
              <img src={dish.image} className="card-img-top" alt={dish.title}
                   style={{width: '100%', height: '200px', objectFit: 'cover'}}/>
              <div className="card-body">
                <h5 className="card-title">{dish.title}</h5>
                <p className="card-text">{dish.price} сом</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h5>Total Amount: {totalAmount} сом</h5>
      <div>
        <button onClick={handleShowModal} className="btn btn-success mt-3 btn-lg w-100">Checkout</button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Order Preview</h4>
          <ul className="list-group">
            {cartItems.map(item => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                <span>{item.title} - {item.price} сом x {item.quantity}</span>
                <button onClick={() => handleRemoveFromCart(item.id)} className="btn btn-danger btn-sm">Delete</button>
              </li>
            ))}
          </ul>
          <h5 className="mt-3">Total Amount: {totalAmount} сом</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleCheckout}>Order</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientDishList;