import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import LocaleSwitcher from './LocaleSwitcher';

export default async function Navbar({ lang }: { lang: Locale }) {
	const { navigation } = await getDictionary(lang);

	const useScroll = () => {
		const [scrollY, setScrollY] = React.useState<number>(0);
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		React.useEffect(() => {
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}, []);
		return scrollY;
	};

	const scrollY = useScroll();
	const isScrolled = scrollY > 0;

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const pages = [
		{
			page: 'Home',
			route: '/',
			admin: false,
		},
		{
			page: 'Search',
			route: '/search',
			admin: false,
		},
		{
			page: 'Pets',
			route: '/pets',
			admin: false,
		},
		{
			page: 'My Pets',
			route: '/mypets',
			admin: false,
		},
		{
			page: 'Add Pets',
			route: '/addpet',
			admin: true,
		},
		{
			page: 'Dashboard',
			route: '/dashboard',
			admin: true,
		},
	];

	return (
		<React.Fragment>
			<nav
				className={`transition-transform transform ${
					isScrolled ? '-translate-y-full' : 'translate-y-0'
				} bg-white/75 sticky`}
			>
				<div className='max-w-screen-md'>
					<Image
						alt='Little Llama'
						src='./src/assets/littleLlama.png'
						height={75}
					/>
					<Link
						className='mr-2 sm:hidden md:flex tracking-widest no-underline font-bold text-teal-500'
						href='/'
					>
						Little Llama
					</Link>

					<div className='grow sm:flex md:hidden'>
						<button
							type='button'
							onClick={handleOpenNavMenu}
							className='bg-teal-500'
						>
							Menubutton
						</button>
						<menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page, index) => (
								<button type='button' key={index} onClick={handleCloseNavMenu}>
									<a className='text-center'>{page.page}</a>
								</button>
							))}
						</menu>
					</div>
					<Link
						className='sm:flex md:hidden font-mono font-bold tracking-widest grow no-underline text-teal-500'
						href='/'
					>
						Little Llama
					</Link>
					<div className='grow sm:hidden md:flex'>
						<button
							type='button'
							className='my-2 text-black bg-teal-500'
							onClick={handleCloseNavMenu}
						>
							<Link href='/' className='no-underline text-black'>
								Home
							</Link>
						</button>
						<button
							type='button'
							className='my-2 text-black bg-teal-500'
							onClick={handleCloseNavMenu}
						>
							<Link href='/search' className='no-underline text-black'>
								Search
							</Link>
						</button>
						<button
							type='button'
							onClick={handleCloseNavMenu}
							className='my-2 text-black bg-teal-500'
						>
							<Link href='/mypets' className='no-underline text-black'>
								My Pets
							</Link>
						</button>
						<button
							type='button'
							onClick={handleCloseNavMenu}
							className='my-2 text-black bg-teal-500'
						>
							<Link href='/pets' className='no-underline text-black'>
								Pets
							</Link>
						</button>
					</div>

					<div className='grow'>
						<button
							data-tooltip-target='tooltip-settings'
							data-tooltip-placement='bottom'
							type='button'
							onClick={handleOpenUserMenu}
							className='p-0'
						>
							Llama
							<Image alt='home-avatar' src='./src/assets/littleLlama.png' />
						</button>
						<div
							id='tooltip-settings'
							role='tooltip'
							className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
						>
							Setting
							<div className='tooltip-arrow' data-popper-arrow></div>
						</div>
						<button type='button' onClick={handleCloseUserMenu}>
							<Link href='/' className='text-center no-underline text-black'>
								Hello
							</Link>
						</button>
						<LocaleSwitcher />
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
}
