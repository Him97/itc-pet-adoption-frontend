import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

export default async function Navbar({
	params: { lang },
}: {
	params: { lang: Locale };
}) {
	const { navbar } = await getDictionary(lang);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event) => {
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
			page: navbar.home,
			route: '/',
		},
		{
			page: navbar.search,
			route: '/search',
		},
		{
			page: navbar.pets,
			route: '/pets',
		},
		{
			page: navbar.mypets,
			route: '/mypets',
		},
	];

	const admin = [
		{
			page: navbar.addpets,
			route: '/addpet',
		},
		{
			page: navbar.dashboard,
			route: '/dashboard',
		},
	];

	return (
		<HideOnScroll {...props}>
			<nav className='sticky bg-white dark:bg-black'>
				<div className='w2/3 md:w-full'>
					<toolbar>
						<Image
							src='./src/assets/littleLlama.png'
							alt='little-llama'
							className='h-72'
						/>
						<Link
							className='text-nowrap mr-2 text-teal-500 sm:hidden md:flex'
							href='/'
							sx={{
								mr: 2,
								fontFamily: 'Markazi Text',
								fontWeight: 700,
								letterSpacing: '.1rem',
								color: 'teal',
								textDecoration: 'none',
							}}
						>
							{t('heading-little-llama')}
						</Link>

						<div className='grow-0 sm:flex md:hidden'>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='success'
							>
								<MenuIcon />
							</IconButton>
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
									<menuitem key={index} onClick={handleCloseNavMenu}>
										<p textAlign='center'>{page.page}</p>
									</menuitem>
								))}
							</menu>
						</div>
						<h5
							className='wrap-0 grow-1 sm:flex md:hidden text-teal-500'
							noWrap
							href='/'
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								textDecoration: 'none',
							}}
						>
							{t('heading-little-llama')}
						</h5>
						<div className='grow-1 sm:hidden md:flex'>
							<button
								type='button'
								className='text-teal-500 bg-transparent my-2'
								onClick={handleCloseNavMenu}
							>
								<Link
									href='/'
									className='no-underline text-black dark:text-white'
								>
									{t('link-home')}
								</Link>
							</button>
							<button
								type='button'
								className='text-teal-500 bg-transparent my-2'
								onClick={handleCloseNavMenu}
							>
								<Link
									href='/search'
									className='no-underline text-black dark:text-white'
								>
									{t('text-search')}
								</Link>
							</button>
							{user ? (
								<button
									type='button'
									className='bg-teal-500 text-black my-2'
									onClick={handleCloseNavMenu}
								>
									<Link
										href='/mypets'
										className='no-underline text-black dark:text-white'
									>
										{t('link-mypets')}
									</Link>
								</button>
							) : (
								<button
									type='button'
									className='text-teal-500 bg-transparent my-2'
									onClick={handleCloseNavMenu}
								>
									<Link
										href='/pets'
										className='no-underline text-black dark:text-white'
									>
										{t('link-pets')}
									</Link>
								</button>
							)}
						</div>
						{user.admin && (
							<div className='grow-0'>
								<Tooltip title='Admin pages'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar src='./src/assets/littleLlama.png' />
									</IconButton>
								</Tooltip>
								<menu
									className='mt-3'
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{admin.map((setting, index) => (
										<button
											key={index}
											type='button'
											onClick={handleCloseUserMenu}
										>
											<Link
												className='text-center text-black dark:text-white no-underline'
												href={setting.route}
											>
												{setting.page}
											</Link>
										</button>
									))}
								</menu>
							</div>
						)}
					</toolbar>
				</div>
			</nav>
		</HideOnScroll>
	);
}
