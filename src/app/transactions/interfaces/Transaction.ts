import { User } from "src/app/user/interfaces/User";

export interface Transaction {
	_id: string;
	currency: string;
	userTo: User,
	value: number,
	userFrom: User,
	type: TransactionType | string,
	timestamp?: string;
	desc?: string;
}

export enum TransactionType {
	DEBIT = 'DEBIT',
	CREDIT = 'CREDIT'
}