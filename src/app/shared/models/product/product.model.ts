import { ICategory } from "../category/category.model";

export interface IProduct {
    category: ICategory;
    title: string;
    description: string;
    image: string;
    price: number;
    weight: string;
    path: string;
    count: number;
    id?: number;
}