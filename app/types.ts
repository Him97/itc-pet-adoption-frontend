export interface UserObj {
    id?: string|number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    country: string;
    region: string;
    bio?:string|null|undefined;
    admin?: boolean|null|undefined;
}

export interface PetObj {
    id?: string|number;
    userid?: string|number;
	category: string;
	subcategory: string;
	country: string;
	region: string;
	title?: string;
	description?: string;
	availability?: string;
    isgivinghelp?: boolean;
    isurgent?: boolean;
    image?: string;
}

export interface FadeProps {
	children: React.ReactElement;
	in?: boolean;
	onClick?: unknown;
	onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
	onExited?: (node: HTMLElement, isAppearing: boolean) => void;
	ownerState?: unknown;
}

export interface ModalProps{
	open: boolean;
	handleClose: () => void;
}