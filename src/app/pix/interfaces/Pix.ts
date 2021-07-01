import { User } from "src/app/user/interfaces/User";

export interface Pix {
	_id: string;
	key: string;
	label: string;
	user: User | string;
}