import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {addDish, fetchDishes} from '../../store/dishesSlice';

const AddContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dish, setDish] = useState({
    title: '',
    price: '',
    image: '',
  });

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addDish(dish));
    navigate('/admin/dishes');
    dispatch(fetchDishes());
  };

  return (
    <div className="container mt-5">
      <h1>Add Dish</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={dish.title}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={dish.price}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image"
          value={dish.image}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <div>{dish.image &&
          <div>
            <span className="me-5">Photo preview</span>
            <img src={dish.image} alt="Preview" className="img-thumbnail mt-3"
                 style={{width: '150px', height: 'auto'}}/></div>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add</button>
      </form>
    </div>
  );
};

export default AddContact;