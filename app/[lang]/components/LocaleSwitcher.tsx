'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { i18n } from '@/i18n.config';

export default function LocaleSwitcher() {
	const pathName = usePathname();

	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/';
		const segments = pathName.split('/');
		segments[1] = locale;
		return segments.join('/');
	};

	return (
		<div className='flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse'>
			<button
				type='button'
				data-dropdown-toggle='language-dropdown-menu'
				className='inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
			>
				English (US)
			</button>
			<div
				className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700'
				id='language-dropdown-menu'
			>
				<ul className='flex gap-x-3'>
					{i18n.locales.map((locale) => {
						return (
							<li key={locale}>
								<Link
									href={redirectedPathName(locale)}
									className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
									role='menuitem'
								>
									{locale}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<button
				data-collapse-toggle='navbar-language'
				type='button'
				className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
				aria-controls='navbar-language'
				aria-expanded='false'
			>
				<span className='sr-only'>Open main menu</span>
			</button>
		</div>
	);
}
