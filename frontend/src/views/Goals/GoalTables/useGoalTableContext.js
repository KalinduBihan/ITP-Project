import { GoalTableContext } from "../../context/GoalTableContext"
import { useContext } from "react"

export const useGoalTableContext = () => {
  const context = useContext(GoalTableContext)

  if(!context) {
    throw Error('useGoalTableContext must be used inside an GoalTableContextProvider')
  }

  return context
}