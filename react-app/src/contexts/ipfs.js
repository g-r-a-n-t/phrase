import { createContext, useContext } from 'react'

export const IpfsContext = createContext()

export function useIpfsContext () {
  return useContext(IpfsContext)
}
