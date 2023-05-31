import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api, CommentsType, PostType, UserType } from "./api";
import { RootState } from "./store";

export const getPosts = createAsyncThunk<PostType[], any, { state: RootState }>('root/getPosts', async (_, {
    rejectWithValue,
    dispatch,
    getState
}) => {
    try {
        const result = await api.getPosts(getState().root.currentPage)
        dispatch(setTotalCount(result.headers["x-total-count"]))
        dispatch(setCurrentPage())
        return result.data
    } catch (error) {
        return rejectWithValue(null)
    } finally {
        dispatch(isFetchingStatus(false))
    }
})
export const getUsers = createAsyncThunk<UserType[], any>('root/getUsers', async (_, { rejectWithValue }) => {
    try {
        const result = await api.getUsers()
        return result.data
    } catch (error) {
        return rejectWithValue(null)
    }
})
export const getComments = createAsyncThunk<CommentsType[], any>('root/getComments', async (postId, { rejectWithValue }) => {
    try {
        const result = await api.getComments(postId)
        return result.data
    } catch (error) {
        return rejectWithValue(null)
    }
})

const rootSlice = createSlice(
    {
        name: 'root',
        initialState: {
            currentPage: 1,
            totalCount: 0,
            fetching: true,
            posts: [] as PostType[],
            users: [] as UserType[],
            comments: [] as CommentsType[],
        },
        reducers: {
            isFetchingStatus: (state, action: PayloadAction<boolean>) => {
                state.fetching = action.payload
            },
            setCurrentPage: (state) => {
                state.currentPage = state.currentPage + 1
            },
            setTotalCount: (state, action: PayloadAction<number>) => {
                state.totalCount = action.payload
            },
        },
        extraReducers: builder => {
            builder
                .addCase(getPosts.fulfilled, (state, action) => {
                    state.posts.push(...action.payload)
                })
                .addCase(getUsers.fulfilled, (state, action) => {
                    state.users.push(...action.payload)
                })
                .addCase(getComments.fulfilled, (state, action) => {
                    state.comments.push(...action.payload)
                })
        }
    }
)

export const rootThunks = {
    getPosts,
    getUsers,
    getComments,
}
export const {
    isFetchingStatus,
    setCurrentPage,
    setTotalCount
} = rootSlice.actions

export const root = rootSlice.reducer