import React, { useEffect, useState } from "react"
import { getDishesFromGoogleSheets } from "../../api/getDishesFromGoogleSheets"

export const DisplayDishes = () => {
  const [words, setWords] = useState<string[]>([])
  const apiKey = "AIzaSyB18ofrIc54DucxeL--ua-Vy90DmIp350U"
  const range = "Feuille 1!A18:A22"
  const spreadsheetId = "1duSgyFrpsX6zDDDSZyZyoFQry32dGVH9Pq4S-jTYKfY"

  useEffect(() => {
    const fetchData = async () => {
      await getDishesFromGoogleSheets(spreadsheetId, apiKey, range, setWords)
    }

    fetchData()
  }, [spreadsheetId, apiKey, range])

  return (
    <div>
      <div>
        <h1>Mots de la Feuille Google</h1>
        {words.length > 0 ? (
          <ul>
            {words.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        ) : (
          <p>Chargement des mots...</p>
        )}
      </div>
    </div>
  )
}
