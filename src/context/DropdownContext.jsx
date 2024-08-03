import { createContext, useContext, useState } from "react";

const DropdownContext=createContext();
export function DropdownProvider({children}){
const [isOpen,setIsOpen]=useState(false)
const toggleDropdown = () => {
    setIsOpen(open => !open);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return <DropdownContext.Provider value={{isOpen,toggleDropdown,closeDropdown}}>{children}</DropdownContext.Provider>
}
export function useDropdown(){
    const context=useContext(DropdownContext)
    if(context===undefined)throw new Error('DropdownContext was used outside')
return context;
}

