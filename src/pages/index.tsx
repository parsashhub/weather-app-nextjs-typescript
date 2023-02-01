import React, { useEffect, useState } from "react";
import Head from "next/head";
import WeatherHome from "@/components/WeatherHome";
import LandscapeDisablerContainer from "../components/LandscapeDisbalerContainer";
import { initInterceptors } from "@/reuseable/axios";
import axios from "axios";
import { Puff } from "react-loader-spinner";

const Home = () => {
  const [ip, setIp] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await axios.get("https://ip.nf/me.json");
      const data = await res.data.ip;
      setIp(
        `${data?.city}${data.country_code ? `, ${data.country_code}` : ""}`
      );
    } catch (e: any) {
      console.error(e?.response);
    }
  };

  useEffect(() => {
    initInterceptors(
      () => setLoader(true),
      () => setLoader(false)
    );
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>weather app</title>
        <meta name="description" content="daily checker for weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <LandscapeDisablerContainer>
          <WeatherHome ip={ip} />
        </LandscapeDisablerContainer>
        <div style={{ margin: "auto" }}>
          <Puff
            height="120"
            width="120"
            color="#4b4ebf"
            ariaLabel="puff-loading"
            radius={1}
            wrapperStyle={{
              position: "fixed",
              top: "30%",
              left: "36%",
            }}
            visible={loader}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
