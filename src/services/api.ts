//const BASE_URL = " localhost:3000/api/"; 
export async function getBowls(){
    const response = await fetch("https://fresse-api.onrender.com/api/bowls");
    //const response = await fetch(BASE_URL + "/bowls");
    const data = await response.json();
    return data;
}

export async function getCategories(){
 const response = await fetch("https://fresse-api.onrender.com/api/categories");
 //const response = await fetch(BASE_URL +"/categories");
    const data = await response.json();
    return data;
}

export async function getIngredients(){
 const response = await fetch("https://fresse-api.onrender.com/api/ingredients");
 // const response = await fetch(BASE_URL +"/ingredients");
    const data = await response.json();
    return data;
}

