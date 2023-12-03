import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import './App.css';
import Router from './utils/Router';
import Navbar from './pages/components/Navbar';
import Footer from './pages/components/Footer';
import { GET } from './utils/api';

export default function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	const fetchCurrentUser = async () => {
		try {
			const res = await GET('/login');
			if (res !== null) {
				console.log(res);
				setUser(res);
			} else {
				console.log('No user found');
			}
		} catch (error) {
			console.log('Error fetching current user', error);
		}
	};

	return (
		<Stack minHeight='100vh'>
			<Navbar user={user} />
			<Router user={user} />
			<Footer />
		</Stack>
	);
}
