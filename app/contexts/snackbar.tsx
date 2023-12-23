'use client';
import * as React from 'react';

interface SnackbarContextProps {
	SnackbarProps: (message: string, isSuccess: boolean) => void;
}

export const SnackbarContext = React.createContext<
	SnackbarContextProps | undefined
>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [snackbarState, setSnackbarState] = React.useState<{
		message: string;
		isSuccess: boolean;
	} | null>(null);

	const SnackbarProps = (message: string, isSuccess: boolean) => {
		setSnackbarState({ message, isSuccess });
	};

	const handleClose = () => {
		setSnackbarState(null);
	};

	return (
		<SnackbarContext.Provider value={{ SnackbarProps }}>
			{children}
			{snackbarState && (
				<div open={true} autoHideDuration={6000} onClose={handleClose}>
					<alert
						severity={snackbarState.isSuccess ? 'success' : 'error'}
						className='w-full'
					>
						{snackbarState.message}
					</alert>
				</div>
			)}
		</SnackbarContext.Provider>
	);
};
