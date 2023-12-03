import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import MyPets from '../pages/pet/MyPets';
import Pets from '../pages/pet/Pets';
import Search from '../pages/pet/Search';
import AddPet from '../pages/admin/AddPet';
import Dashboard from '../pages/admin/Dashboard';
import PetDetails from '../pages/pet/components/PetDetails';
import EditPet from '../pages/admin/EditPet';
import NotFound from '../pages/components/NotFound';

export default function Router({ user }) {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' exact element={<Home user={user} />}></Route>
				<Route path='/home' element={<Home user={user} />}></Route>
				<Route path='/mypets' element={<MyPets user={user} />}></Route>
				<Route path='/pets' element={<Pets user={user} />}></Route>
				<Route path='/pets/:id' element={<PetDetails user={user} />}></Route>
				<Route path='/search' element={<Search user={user} />}></Route>
				<Route path='/addpet' element={<AddPet user={user} />}></Route>
				<Route path='/pet/:id/edit' element={<EditPet user={user} />}></Route>
				<Route path='/dashboard' element={<Dashboard user={user} />}></Route>
				<Route path='*' element={<NotFound />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

Router.propTypes = {
	user: PropTypes.object,
};
