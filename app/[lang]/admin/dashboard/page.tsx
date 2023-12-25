import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box,
	Link,
	Paper,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	List,
	ListItem,
	ListItemText,
	Grid,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PetsList from '../../pet/components/PetsList';
import { GET } from '../../utils/api';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box component='center' sx={{ width: '100%', height: '100%' }}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}
const StyledAccordion = styled(Accordion)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	color: theme.palette.text.secondary,
}));

export default function Dashboard({ user }) {
	const theme = useTheme();
	const navigate = useNavigate();
	const [value, setValue] = useState(0);
	const [users, setUsers] = useState([]);
	const [petsData, setPetsData] = useState([]);

	useEffect(() => {
		if (user.admin === false) {
			navigate('*');
		}
		fetchUsers();
		fetchPets();
	}, [user, navigate]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const fetchUsers = async () => {
		const res = await GET('/user');
		console.log(res);
		setUsers(res);
		return res;
	};

	const fetchPets = async () => {
		try {
			const res = await GET('/pet');
			setPetsData(res);
		} catch (error) {
			console.error('Error fetching pets data:', error);
		}
	};

	return (
		<Box width='100%' component='center'>
			<AppBar position='static'>
				<Box bgcolor='teal' minHeight='25vh'>
					<Grid
						container
						maxWidth='md'
						height={100}
						gap={4}
						justifyContent='space-between'
					>
						<Grid item xs={6} md={6} gap={2} m={4}>
							<Typography
								variant='h3'
								fontFamily='Markazi Text'
								align='left'
								color='secondary'
							>
								Admin Dashboard
							</Typography>
							<Typography align='left'>
								Toggle the tabs to view all users and pets in the database.
							</Typography>
						</Grid>
						<Grid item flexGrow={1} xs='auto' md={4} position='relative'>
							<img
								src='./src/assets/walkingllama.png'
								width='100%'
								style={{
									borderRadius: 5,
									position: 'absolute',
									top: '0',
									left: '0',
								}}
							/>
						</Grid>
					</Grid>
				</Box>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor='primary'
					indicatorColor='primary'
					variant='fullWidth'
					style={{ backgroundColor: 'teal' }}
				>
					<Tab label='Users' {...a11yProps(0)} />
					<Tab label='Pets' {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0} dir={theme.direction}>
				<Box
					flex
					flexDirection='column'
					maxWidth='md'
					m={8}
					height='100%'
					justifyContent='center'
				>
					<Masonry columns={3} spacing={2}>
						{users.map((user, index) => (
							<Paper key={index}>
								<StyledAccordion>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography>
											{user.firstname + ' ' + user.lastname}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<List>
											<ListItem sx={{ justifyContent: 'space-between' }}>
												<ListItemText primary='Email Address' />
												<ListItemText align='right' primary={user.email} />
											</ListItem>
											<ListItem sx={{ justifyContent: 'space-between' }}>
												<ListItemText primary='Phone Number' />
												<ListItemText primary={user.phone} />
											</ListItem>
											{user.bio && (
												<ListItem sx={{ justifyContent: 'space-between' }}>
													<ListItemText primary='Bio' />
													<ListItemText primary={user.bio} />
												</ListItem>
											)}
											<ListItem sx={{ justifyContent: 'space-between' }}>
												<ListItemText primary='Pets Owned' />
												<ListItemText
													primary={user.owned_pets.map((pet, index) => (
														<Link underline='none' color='inherit' key={index}>
															{' '}
															{pet.name}
														</Link>
													))}
												/>
											</ListItem>
											<ListItem sx={{ justifyContent: 'space-between' }}>
												<ListItemText primary='Pets Saved' />
												<ListItemText
													primary={user.saved_pets.map((pet, index) => (
														<Link underline='none' color='inherit' key={index}>
															{' '}
															{pet.name}
														</Link>
													))}
												/>
											</ListItem>
										</List>
									</AccordionDetails>
								</StyledAccordion>
							</Paper>
						))}
					</Masonry>
				</Box>
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<PetsList petsData={petsData} user={user} />
			</TabPanel>
		</Box>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
Dashboard.propTypes = {
	user: PropTypes.object,
};
