import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Signup from './components/Signup';
import Login from './components/Login';
import PetsList from '../../pet/components/PetsList';
import ProfileSettings from './components/ProfileSettings';
import { GET } from '../../utils/api';

export default function Home() {
	const [petsData, setPetsData] = React.useState<object>([]);
	const [openSignup, setOpenSignup] = React.useState<boolean>(false);
	const [openLogin, setOpenLogin] = React.useState<boolean>(false);
	const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
	const [openError, setOpenError] = React.useState<boolean>(false);
	const [openProfile, setOpenProfile] = React.useState<boolean>(false);

	React.useEffect(() => {
		fetchPetsData();
	}, []);

	const fetchPetsData = async () => {
		try {
			const res = await GET('/pet');
			setPetsData(res);
		} catch (error) {
			console.error('Error fetching pets data:', error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('USER');
		console.log(user, localStorage.getItem('USER'));
		if (localStorage.getItem('USER') === null) {
			setOpenSuccess(true);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			setOpenError(true);
		}
	};

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
	};

	return (
		<React.Fragment>
			<Signup open={openSignup} handleClose={() => setOpenSignup(false)} />
			<Login open={openLogin} handleClose={() => setOpenLogin(false)} />
			<ProfileSettings
				open={openProfile}
				handleClose={() => setOpenProfile(false)}
				user={user}
			/>
			<center className='h-full'>
				<div className='bg-teal-500 min-h-max flex justify-center items-center'>
					<div className='grid h-full max-w-screen-md p-2 gap-4 justify-center'>
						<div className='grid' xs={6} md={7}>
							<div className='gap-2'>
								<h1 className='text-left text-amber-500'>
									{user
										? `${t('heading-hey')} ${user.firstname}!`
										: `${t('heading-little-llama')}`}
								</h1>
								<h3 className='text-left'>
									{user
										? `${t('heading-welcome')}`
										: `${t('heading-pet-adoption')}`}
								</h3>
								<p className='text-left'>{t('para-home')}</p>
								{user ? (
									<div className='flex flex-col justify-start gap-5'>
										<button
											type='button'
											onClick={() => setOpenProfile(true)}
											color='secondary'
										>
											{t('profile-settings')}
										</button>
										<button
											type='button'
											onClick={handleLogout}
											color='secondary'
										>
											{t('button-logout')}
										</button>
									</div>
								) : (
									<div className='flex flex-col justify-start gap-5'>
										<button
											type='button'
											onClick={() => setOpenLogin(true)}
											color='secondary'
										>
											{t('button-login')}
										</button>
										<button
											type='button'
											onClick={() => setOpenSignup(true)}
											color='secondary'
										>
											{t('button-signup')}
										</button>
									</div>
								)}
							</div>
						</div>
						<div className='grow sm:w-auto md:w-1/3 relative'>
							<Image
								alt='pets'
								src='./src/assets/your-pet-included.jpg'
								className='w-full rounded shadow-sm absolute top-1/2 left-0'
							/>
						</div>
					</div>
				</div>
				<div className='max-w-screen-md p-2 m-4 justify-center'>
					<div className='flex flex-col justify-evenly items-center'>
						<h2 className='text-black'>{t('heading-petlist-home')}</h2>
						<button type='button' className='bg-amber-500 h-4/6'>
							<Link href='/search' className='text-black no-underline'>
								Search
							</Link>
						</button>
					</div>
					<PetsList petsData={petsData} hide={true} />
				</div>
			</center>
		</React.Fragment>
	);
}
