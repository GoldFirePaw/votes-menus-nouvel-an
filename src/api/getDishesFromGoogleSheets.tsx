import axios from "axios"

interface Dish {
  name: string
}

type SetWordsFunction = React.Dispatch<React.SetStateAction<string[]>>

export const getDishesFromGoogleSheets = async (
  spreadsheetId: string,
  apiKey: string,
  range: string,
  setWords: SetWordsFunction
) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    const response = await axios.get(url)
    const values = response.data.values

    if (values) {
      // Assuming each row in the sheet contains a dish name in the first cell
      setWords(values.map((value: string[]) => value.join("")))
    } else {
      console.log("No data found in the specified range.")
      setWords([])
    }
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error)
  }
}

export default getDishesFromGoogleSheets
