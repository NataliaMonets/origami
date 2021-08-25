export interface IProduct {
    id?: number;
    title: string;
    description: string;
    image: string;
    price: string;
    weight: string;
    path: string;
}

export class Product implements IProduct {
    constructor(
        public title: string,
        public description: string,
        public image: string,
        public price: string,
        public weight: string,
        public path: string
    ) { }
}