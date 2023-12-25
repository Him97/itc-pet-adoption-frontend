import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function Footer({ lang }: { lang: Locale }) {
	const { navigation } = await getDictionary(lang);

	return (
		<footer className='p3 mt-auto bg-black/75 dark:bg-white/75'>
			<div className='max-w-screen-sm'>
				<a className='text-teal-500'>
					{'Copyright © '}
					<Link color='inherit' href='/'>
						Little Llama
					</Link>{' '}
					{new Date().getFullYear()}
					Xin
				</a>
			</div>
		</footer>
	);
}
