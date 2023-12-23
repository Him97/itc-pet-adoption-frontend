import * as React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function Footer({
	params: { lang },
}: {
	params: { lang: Locale };
}) {
	const { footer } = await getDictionary(lang);
	return (
		<footer className='p-3 mt-auto bg-white/75 dark:bg-black/75'>
			<div className='sm:max-w-10'>
				<div className='bg-teal-500'>
					{'Copyright © '}
					<Link color='inherit' href='/'>
						{footer.littlellama}
					</Link>{' '}
					{new Date().getFullYear()}
					{footer.xin}
				</div>
			</div>
		</footer>
	);
}
