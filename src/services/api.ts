const BASE_URL = "http://localhost:3000/api";

export async function getBowls(){
    const response = await fetch(BASE_URL+"/bowls");
    const data = await response.json();
    return data;
}

export async function getCategories(){
 const response = await fetch(BASE_URL+"/categories");
    const data = await response.json();
    return data;
}

export async function getIngredients(){
 const response = await fetch(BASE_URL+"/ingredients");
    const data = await response.json();
    return data;
}

