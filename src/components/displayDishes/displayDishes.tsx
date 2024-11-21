// components/DisplayDishes.tsx
import React, { useEffect, useState } from "react"
import { getDishes } from "../../api/getDishes"
import { voteForDishes } from "../../api/voteForDishes"
import { unvoteForDishes } from "../../api/unvoteForDishes"

export const DisplayDishes = () => {
  const [dishes, setDishes] = useState<
    { id: string; name: string; votes: number }[]
  >([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [votedDishes, setVotedDishes] = useState<string[]>([])

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dishesData = await getDishes()
        setDishes(dishesData)
        const votedDishIds = dishesData
          .filter((dish) => dish.voted)
          .map((dish) => dish.id)
        setVotedDishes(votedDishIds)
      } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error)
      }
    }

    fetchDishes()
  }, [])

  const handleVote = async (dishId: string) => {
    try {
      await voteForDishes(dishId)
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.id === dishId ? { ...dish, votes: dish.votes + 1 } : dish
        )
      )
      setVotedDishes((prevVotedDishes) => [...prevVotedDishes, dishId])
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const handleUnvote = async (dishId: string) => {
    try {
      await unvoteForDishes(dishId)
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.id === dishId ? { ...dish, votes: dish.votes - 1 } : dish
        )
      )
      setVotedDishes((prevVotedDishes) =>
        prevVotedDishes.filter((id) => id !== dishId)
      )
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div>
      <h1>Plats de Google Sheets</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {dishes.length > 0 ? (
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              {dish.name} - Votes : {dish.votes}
              {votedDishes.includes(dish.id) ? (
                <>
                  <span> (Vous avez déjà voté)</span>
                  <button onClick={() => handleUnvote(dish.id)}>
                    Retirer le vote
                  </button>
                </>
              ) : (
                <button onClick={() => handleVote(dish.id)}>Voter</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des plats...</p>
      )}
    </div>
  )
}
