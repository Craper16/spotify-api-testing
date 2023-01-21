import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../config/users/usersConfig';
import { imagesModel } from './authSlice';

interface responseData {
  display_name: string | null;
  images: imagesModel[];
  id: string;
}

export const GetUser = createAsyncThunk(
  'auth/getUser',
  async (undefined, thunkAPI) => {
    try {
      const response = await getUser();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response?.error.message || 'An error has occured'
        );
      }

      const data: responseData = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'An error has occured');
    }
  }
);
