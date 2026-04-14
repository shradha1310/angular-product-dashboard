export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    brand: string;
    rating: number;
    stock: number;
    thumbnail: string;
}
  
export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}