import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {editDish, fetchDishes} from '../../store/dishesSlice';

const EditContact = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dish = useAppSelector((state) => state.dishes.dishes.find((dish) => dish.id === id)
  );

  const [dishData, setDishData] = useState({
    title: dish.title,
    price: dish.price,
    image: dish.image,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(editDish({id, updatedDish: dishData}));
      navigate('/admin/dishes');
      dispatch(fetchDishes());
    }
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setDishData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <h1>Edit Dish</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={dishData.title}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={dishData.price}
          onChange={onFieldChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image"
          value={dishData.image}
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
        <button type="submit" className="btn btn-primary mt-3">Save</button>
      </form>
    </div>
  );
};

export default EditContact;