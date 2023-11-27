import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../mock/UserInterface';

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async (user: User, thunkAPI) => {
        const { email, password, password2 } = user
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/auth/register/`,
                {
                    // mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        password2
                    }),
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('logged', 'true');
                localStorage.setItem("token", (data.data.token))
                localStorage.setItem('user', JSON.stringify(data.data))
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async (user: any, thunkAPI) => {
        const { email, password } = user
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/auth/login/`,
                {
                    // mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                localStorage.setItem('logged', 'true');
                localStorage.setItem("token", (data.token))
                localStorage.setItem('user', JSON.stringify(data.data))
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        isSuccess: false,
        isRegistered: false,
        isError: false,
        errorMessage: '',
        message: '',
        users: '',
        isFetchingUser: false
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.isFetching = true;
            state.isRegistered = false;
        })
        builder.addCase(signupUser.fulfilled, (state) => {
            state.isFetching = false;
            state.isRegistered = true;
            state.message = "User successfully registered"
        })
        builder.addCase(signupUser.rejected, (state, action: any) => {
            state.isFetching = false;
            state.isRegistered = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
            state.message = action.payload.message;
        })

        builder.addCase(loginUser.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(loginUser.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.message = "User successfully logged in"
            return state;
        })
        builder.addCase(loginUser.rejected, (state, action: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
            state.message = action.payload.message;
        })
    },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer