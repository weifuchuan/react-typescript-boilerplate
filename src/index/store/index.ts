import EventEmitter from "wolfy87-eventemitter";
import React, { useContext } from 'react'

export class Store extends EventEmitter {}

export const store = new Store();

export const StoreContext = React.createContext(store); 

export function useStore(){
  return useContext(StoreContext)
}
