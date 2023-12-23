import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web';
import { POST } from '../../route';
import { FadeProps, ModalProps } from '@/app/types';

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
	props,
	ref
) {
	const {
		children,
		in: open,
		onClick,
		onEnter,
		onExited,
		ownerState,
		...other
	} = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter(null as never, true);
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited(null as never, true);
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{React.cloneElement(children, { onClick })}
		</animated.div>
	);
});

export default function Login({ open, handleClose }: ModalProps) {
	interface Token extends Response {
		token: string;
	}

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response: Token = await POST('/login', { email, password });
			console.log('Token:', response);
			localStorage.setItem('USER', JSON.stringify(response));
			console.log('Token saved in localStorage:', localStorage.getItem('USER'));
			if (localStorage.getItem('USER')) {
				SnackbarProps(t('t-login-success'), true);
				setTimeout(async () => {
					navigate('/');
				}, 1000);
			} else {
				SnackbarProps(t('t-login-failed'), false);
			}
		} catch (error) {
			SnackbarProps(t('t-login-failed'), false);
		}
	};

	return (
		<dialog
			aria-labelledby='login'
			aria-describedby='login'
			open={open}
			onClose={handleClose}
		>
			<Fade in={open}>
				<div className='absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 bg-white dark:bg-black text-white dark:text-black rounded shadow-current p-4 mt-8 flex flex-col items-center min-w-1'>
					<svg className='m-1'>
						<Image
							alt='little-llama'
							src='../../../../src/assets/littleLlama.png'
						/>
					</svg>
					<h1>Login</h1>
					<form noValidate className='mt-1'>
						<input
							required
							name='email'
							autoComplete='email'
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							error={
								email !== '' &&
								!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
							}
							helperText={
								email !== '' &&
								!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
									? t('para-invalid-email')
									: ''
							}
						/>
						<input
							required
							name='password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<label
							control={<Checkbox value='remember' color='secondary' />}
							label='Remember me'
						/>
						<button
							type='submit'
							className='my-3'
							onClick={handleLogin}
							disabled={
								email === '' ||
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
								password === ''
							}
						>
							Login
						</button>
						<div>
							<div className='xs'>
								<Link href='#'>Forgot password?</Link>
							</div>
							<div>
								<Link href='#'>{"Don't have an account? Sign Up"}</Link>
							</div>
						</div>
					</form>
				</div>
			</Fade>
		</dialog>
	);
}
