export interface ICategory {
    id?: number;
    name: string;
    icon: string;
    path: string;
}

export class Category implements ICategory {
    constructor(
        public name: string,
        public icon: string,
        public path: string
    ) { }
}