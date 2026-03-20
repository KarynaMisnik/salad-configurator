export interface BaseType {
    id: number;
    name: string;
    price: number;
    image_url: string;
    baracode_url: string;
}

export interface Bowl extends BaseType{
base_type_id: number;
volume: number;
slot_count: number;
shape: 'round' | 'square';
}

 export interface Category{
    id: number;
    name: string;
    base_type_id: number;
 }

 export interface Ingredient extends BaseType{
    categoryId: number;
    diets: string[];
    weight_grams: number;
 }

 export interface User{
    user_id: number;
    email: string;
    name: string;
    role: string;
 }

 export interface Recipe{
    id: number;
    userID: number;
    name: string;
    bowlId: number;
    ingredientIds: number[];
    slots?: Record<string, Ingredient | null>;
    is_public: boolean;
 }
