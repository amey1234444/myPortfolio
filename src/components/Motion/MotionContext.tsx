import { createContext, useContext } from 'react'

export const MotionContext = createContext({
  paused: false,
  reduced: true,
  toggleMotion: () => {},
})
export const usePortfolioMotion = () => useContext(MotionContext)
