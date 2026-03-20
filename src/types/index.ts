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