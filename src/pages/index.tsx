import React, { useEffect, useState } from "react";
import Head from "next/head";
import WeatherHome from "@/components/WeatherHome";
import LandscapeDisablerContainer from "../components/LandscapeDisbalerContainer";
import axios from "axios";

const Home = () => {
  const [ip, setIp] = useState<string>("");

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
      </main>
    </>
  );
};

export default Home;
