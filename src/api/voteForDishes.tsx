import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const voteForDishes = async (dishId: string) => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/vote/${encodeURIComponent(dishId)}`,
      {},
      { withCredentials: true }
    )
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("Vous avez déjà voté pour ce plat.")
    } else {
      console.error("Erreur lors du vote :", error)
      throw error
    }
  }
}
