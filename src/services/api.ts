export async function getBowls(){
    const response = await fetch("https://fresse-api.onrender.com/api/bowls");
    const data = await response.json();
    console.log(data);
}

export async function getCategories(){
 const response = await fetch("https://fresse-api.onrender.com/api/categories");
    const data = await response.json();
    console.log(data);
}

export async function getIngredients(){
 const response = await fetch("https://fresse-api.onrender.com/api/ingredients");
    const data = await response.json();
    console.log(data);
}

