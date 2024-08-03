
import { createContext, useContext, useState } from "react";

const DropdownContext=createContext();
function DropdownProvider({children}){
const [isOpen,setIsOpen]=useState(false)
function toggleDropdown() {
    setIsOpen(open => !open);
  };
  function closeDropdown(){
    setIsOpen(false);
  };

  return (<DropdownContext.Provider value={{isOpen,toggleDropdown,closeDropdown}}>{children}</DropdownContext.Provider>)
}
function useDropdown(){
    const contextDrop=useContext(DropdownContext)
    if(contextDrop===undefined)throw new Error('DropdownContext was used outside')
return contextDrop;
}
export {DropdownProvider,useDropdown}

