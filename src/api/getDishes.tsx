// api/getDishes.ts
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getDishes = async () => {
  try {
    // Récupérer les plats depuis Google Sheets, avec les credentials (cookies)
    const response = await axios.get(`${API_BASE_URL}/api/dishes-from-sheets`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des plats :", error)
    throw error
  }
}
