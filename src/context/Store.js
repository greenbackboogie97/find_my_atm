import { createContext } from 'react';

export const initialState = {
  records: {
    list: [],
    page: 1,
  },
  filter: {
    ATM_Type: '',
    bankName: '',
    accessible: '',
  },
  mapRef: null,
};

const StoreContext = createContext(null);

export default StoreContext;
