import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import { root } from "./rootSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const rootReducer = combineReducers({
    root
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
