export interface FbResponse{
    title: string;
}

export interface Product{
    id: string;
    type: string; 
    title: string; 
    photo: string; 
    description: string; 
    price: string; 
    date: Date;
    link: string;
    like: number,
    gallery: string,
}