import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    country: 'world'
}

const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        changeCountry: (state, action) => {
            state.country = action.payload
        }
    },
})

const {actions, reducer} = headerSlice;

export const {changeCountry} = actions
export default reducer