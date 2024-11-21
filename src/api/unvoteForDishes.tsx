import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const unvoteForDishes = async (dishId: string) => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/unvote/${encodeURIComponent(dishId)}`,
      {},
      { withCredentials: true }
    )
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("Vous n'avez pas encore voté pour ce plat.")
    } else {
      console.error("Erreur lors du retrait du vote :", error)
      throw error
    }
  }
}
