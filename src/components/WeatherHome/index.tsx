import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import classes from "./weatherHome.module.css";
import { WeatherData } from "@/modals/modals";
import axios from "axios";
import { useDebounce } from "use-debounce";

interface Props {
  ip: string;
}

const WeatherHome = ({ ip }: Props) => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<WeatherData | undefined>();
  const [debouncedValue] = useDebounce(value, 500);

  const getWeatherStatus = async (location: string) => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=2584972354a8436b85b150508232601&q=${location}&aqi=yes`
      );
      setData(res?.data);
      setValue("");
    } catch (e: any) {
      console.error(e.response);
    }
  };

  useEffect(() => {
    if (ip !== "") getWeatherStatus(ip);
  }, [ip]);

  useEffect(() => {
    if (debouncedValue !== "") getWeatherStatus(debouncedValue);
  }, [debouncedValue]);

  return (
    <section style={{ padding: "20px" }}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
          >
            <TextField
              label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="search your city here"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "10rem" }}>
          {data ? (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            >
              <Paper
                className={classes.glass}
                sx={{
                  textAlign: "center",
                  borderRadius: "8px",
                  paddingX: "20px",
                  paddingY: "50px",
                }}
              >
                <Typography variant="h5">
                  {data?.location?.country
                    ? `${data?.location.country}, `
                    : null}
                  {data?.location?.name}
                </Typography>
                <Typography variant="h1" sx={{ marginY: "20px" }}>
                  {data?.current?.temp_c}
                  <PanoramaFishEyeIcon sx={{ position: "absolute" }} />
                </Typography>
                <Typography variant="h6">
                  {data?.current?.condition?.text}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                  Feels like {Math.round(data?.current?.feelslike_c)} degree
                </Typography>
              </Paper>
            </motion.div>
          ) : null}
        </Grid>
      </Grid>
    </section>
  );
};

export default WeatherHome;
