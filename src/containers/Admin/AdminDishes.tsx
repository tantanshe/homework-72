import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteDish, fetchDishes, selectDishes, selectError, selectIsDishesLoading} from '../../store/dishesSlice';
import {Link} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Admin from './Admin';

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const isLoading = useAppSelector(selectIsDishesLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDish(id));
  };

  return (
    <div>
      <Admin/>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1>Dish List</h1>
        <Link to="/addDish" className="btn btn-primary">Add new dish</Link>
      </div>
      {error && <h2>Error loading data</h2>}
      {isLoading && <Spinner/>}
      {dishes.length === 0 &&
        <h2>No dishes in the list!</h2>}
      <div className="row">
        {dishes.map(dish => (
          <div className="col-md-4 mb-4" key={dish.id}>
            <div className="card h-100">
              <img src={dish.image} className="card-img-top" alt={dish.title} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              <div className="card-body">
                <h5 className="card-title">{dish.title}</h5>
                <p className="card-text">{dish.price} сом</p>
                <Link to={`/edit/${dish.id}`} className="btn btn-primary w-100 mb-2">Edit</Link>
                <button onClick={() => handleDelete(dish.id)} className="btn btn-danger w-100">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDishes;