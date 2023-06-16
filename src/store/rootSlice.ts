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
export const getAllPosts = createAsyncThunk<PostType[], any, { state: RootState }>('root/getAllPosts', async (_, {
    rejectWithValue,
    dispatch
}) => {
    try {
        const result = await api.getAllPosts()
        return result.data
    } catch (error) {
        return rejectWithValue(null)
    }
})
export const getUsers = createAsyncThunk<UserType[], any>('root/getUsers', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch
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
            searchValue: '',
            totalCount: 0,
            fetching: true,
            posts: [] as PostType[],
            allPosts: [] as PostType[],
            sortPosts: [] as PostType[],
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
            searchValue: (state, action: PayloadAction<string>) => {
                state.searchValue = action.payload
            },
            sortPostsCreator: (state, action: PayloadAction<PostType[]>) => {
                state.sortPosts = action.payload
            },
        },
        extraReducers: builder => {
            builder
                .addCase(getPosts.fulfilled, (state, action) => {
                    state.posts.push(...action.payload)
                })
                .addCase(getAllPosts.fulfilled, (state, action) => {
                    state.allPosts.push(...action.payload)
                })
                .addCase(getUsers.fulfilled, (state, action) => {
                    console.log(action.payload)
                    state.users = action.payload
                })
                .addCase(getComments.fulfilled, (state, action) => {
                    state.comments.push(...action.payload)
                })
        }
    }
)

export const rootThunks = {
    getPosts,
    getAllPosts,
    getUsers,
    getComments,
}
export const {
    isFetchingStatus,
    setCurrentPage,
    setTotalCount,
    searchValue,
    sortPostsCreator
} = rootSlice.actions

export const root = rootSlice.reducer