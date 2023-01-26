import React, { useState } from "react";
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

const Index = () => {
  const [value, setValue] = useState<string>("");

  return (
    <section style={{ padding: "20px" }}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "10rem" }}>
          <Paper
            className={classes.glass}
            sx={{
              textAlign: "center",
              borderRadius: "8px",
              paddingX: "20px",
              paddingY: "50px",
            }}
          >
            <Typography variant="h5"> New York </Typography>
            <Typography variant="h1">
              24 <PanoramaFishEyeIcon sx={{ position: "absolute" }} />
            </Typography>
            <Typography variant="h6"> Mostly Sunny </Typography>
            <Typography variant="body1"> H:30 L:18 </Typography>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

export default Index;
