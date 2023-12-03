import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { amber, teal } from '@mui/material/colors';

const theme = createTheme({
	typography: {
		fontFamily: ['Karla', 'sans-serif', 'Markazi Text', 'serif'].join(','),
	},
	palette: {
		primary: {
			light: '#ffffff',
			main: '#ffffff',
			dark: '#b2b2b2',
			contrastText: '#fff',
		},
		secondary: amber,
		success: teal,
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);
