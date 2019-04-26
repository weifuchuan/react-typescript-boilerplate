import EventEmitter from 'wolfy87-eventemitter';
import React, { useContext } from 'react';
import { observable } from 'mobx';

export class Store extends EventEmitter {
  @observable some = 0;

  constructor() {
    super();
  }
}

export const store = new Store();

export const StoreContext = React.createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
