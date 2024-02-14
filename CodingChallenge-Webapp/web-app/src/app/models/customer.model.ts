export interface Customer {
    id: number;
    firstName:  string;
    lastName:  string;
    email:  string;
    createdAt: Date
    lastUpdatedAt: Date
}

export interface CustomerResult {
	entities: Customer[];
	totalRecords: number;
}