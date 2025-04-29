import axios from 'axios';
import { API_URL } from './config';

export const fetchTables = async () => {
    try {
        const response = await axios.get(`${API_URL}/tables`);
        return response.data; //.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchMealPlans = async () => {
    try {
        const response = await axios.get(`${API_URL}/meal-plans`);
        return response.data;
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        throw error;
    }
};

export const fetchRecipes = async () => {
    try {
        const response = await axios.get(`${API_URL}/recipes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Get a single meal plan by ID
export const fetchMealPlanById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/meal-plans/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        throw error;
    }
};

// Get a single recipe by ID
export const fetchRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
};

// Add a new meal plan
export const addMealPlan = async (mealPlanData) => {
    try {
        const response = await axios.post(`${API_URL}/meal-plans`, mealPlanData);
        return response.data;
    } catch (error) {
        console.error('Error adding meal plan:', error);
        throw error;
    }
};

// Add a new recipe
export const addRecipe = async (recipeData) => {
    try {
        const response = await axios.post(`${API_URL}/recipes`, recipeData);
        return response.data;
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};

// Delete a meal plan
export const deleteMealPlan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/meal-plans/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting meal plan:', error);
        throw error;
    }
};

// Delete a recipe
export const deleteRecipe = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
};

// Fetch meals for a specific date
export const fetchMeals = async (date) => {
    try {
        const params = date ? `?date=${date}` : '';
        const response = await axios.get(`${API_URL}/meals${params}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};

// Fetch a single meal by ID
export const fetchMealById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/meals/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching meal:', error);
        throw error;
    }
};

// Add a new meal
export const addMeal = async (mealData) => {
    try {
        const response = await axios.post(`${API_URL}/meals`, mealData);
        return response.data;
    } catch (error) {
        console.error('Error adding meal:', error);
        throw error;
    }
};

// Update a meal
export const updateMeal = async (id, mealData) => {
    try {
        const response = await axios.put(`${API_URL}/meals/${id}`, mealData);
        return response.data;
    } catch (error) {
        console.error('Error updating meal:', error);
        throw error;
    }
};

// Delete a meal
export const deleteMeal = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/meals/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting meal:', error);
        throw error;
    }
};
// Add more API functions as needed