'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

export default function LocaleSelector() {
	const pathname = usePathname();
	const [locale, setLocale] = React.useState(i18n.defaultLocale);

	const redirectedPathname = (locale: string) => {
		if (!pathname) return '/';
		const segments = pathname.split('/');
		segments[1] = locale;
		return segments.join('/');
	};

	return (
		<select
			className='bg-teal-500'
			name='language'
			title='language'
			defaultValue='Select Language'
			onChange={() => redirectedPathname(locale)}
		>
			<option disabled className='text-center'>
				Select Language
			</option>
			{i18n.locales.map((locale) => {
				return (
					<option key={locale} value={locale} className='text-center'>
						{locale}
					</option>
				);
			})}
		</select>
	);
}
