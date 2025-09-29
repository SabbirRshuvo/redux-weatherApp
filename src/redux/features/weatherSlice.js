import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: [],
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeather",
  async (cityName) => {
    const apiKey = "e2ef362734f1754ea2eb553507654a6f";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );

    const data = res.json();
    return data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.weatherData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData.push(action.payload);
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
