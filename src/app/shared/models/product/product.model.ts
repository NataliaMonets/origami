import { ICategory } from "../category/category.model";

export interface IProduct {
    category: ICategory;
    title: string;
    description: string;
    image: string;
    price: string;
    weight: string;
    path: string;
    id?: number;
}