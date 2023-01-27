import React, { useEffect, useState } from "react";
import useWindowSize from "../reuseable/useWindowSize";
import { Typography } from "@mui/material";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";

const LandscapeDisablerContainer = ({ children }) => {
  const { height, width } = useWindowSize();
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    if (width > height) {
      setIsLandscape(true);
    } else setIsLandscape(false);
  }, [width, height]);

  return (
    <div>
      {!isLandscape ? (
        children
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "12%",
          }}
        >
          <ScreenRotationIcon
            sx={{
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
          />
          <Typography variant="h5" sx={{ marginY: "20px" }}>
            Please keep your phone upright
          </Typography>
        </div>
      )}
    </div>
  );
};

export default LandscapeDisablerContainer;
