'use client'
import React, { createContext, useContext, useState } from 'react'

interface User {
  _id: string,
  walletPublicAddress : string,
  name : string,
  email : string,
  telegram : string,
  discord : string,
  twitter : string
}

interface UserContextType {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children })=>{
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to access the UserContext
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context;
}