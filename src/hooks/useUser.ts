import { UserContext } from '@/contexts/UserContext';
import react from 'react'
export const useUser=()=>{
    const context= react.useContext(UserContext);
    if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
}