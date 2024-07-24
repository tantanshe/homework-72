import './App.css';
import {Route, Routes} from 'react-router-dom';
import Admin from './containers/Admin/Admin';
import AddDish from './containers/Admin/AddDish';
import EditDish from './containers/Admin/EditDish';
import AdminDishes from './containers/Admin/AdminDishes';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/dishes" element={<AdminDishes/>}/>
        <Route path="/addDish" element={<AddDish/>}/>
        <Route path="/edit/:id"  element={<EditDish/>}/>
        <Route path="*" element={<h2>Not found</h2>}/>
      </Routes>
    </div>
  );
};

export default App;
