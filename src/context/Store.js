import { createContext } from 'react';

export const initialState = {
  records: [],
  filter: {
    ATM_Type: '',
    bankName: '',
    accessible: '',
  },
  mapRef: null,
};

const StoreContext = createContext(null);

export default StoreContext;
