import React, { useState } from "react";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/24/solid";

const RecipeForm = () => {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredientName: "", quantity: "", unit:"" },
  ]);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredientName: "", quantity: "", unit: "" },
    ]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const recipe = { dishName, ingredients, price: parseFloat(price) };

    try {
      const response = await axios.post(
        "http://localhost:5000/task/updatemenu",
        recipe
      ); // Replace with your backend endpoint
      setMessage(`Recipe added: ${response.data.dishName}`);
      setDishName("");
      setIngredients([{ ingredientName: "", quantity: "", unit:"" }]);
      setPrice("");
    } catch (error) {
      console.error(error);
      setMessage("Error adding recipe");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-lg mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Add a New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="dishName"
            className="block text-gray-700 font-medium mb-1"
          >
            Dish Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            id="dishName"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </div>
        <div>
          <h5 className="font-medium text-gray-700">Ingredients</h5>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Ingredient Name"
                value={ingredient.ingredientName}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "ingredientName",
                    e.target.value
                  )
                }
                required
              />
              <input
                type="number"
                className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                required
                min="0"
              />
              <input
                type="text"
                className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                required
              />
              <XCircleIcon className="h-7 w-7 cursor-pointer" color="red" onClick={() => handleRemoveIngredient(index)}/>
            </div>
          ))}
          <button
            type="button"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-1"
          >
            Price
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          disabled={isSubmitting}
        >
          {!isSubmitting? "Submit Recipe" : "Submitting"}
        </button>
        {message && (
          <div className="mt-4 p-3 text-white bg-red-500 rounded-md">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;
