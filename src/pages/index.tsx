import React, { useEffect, useState } from "react";
import Head from "next/head";
import Index from "@/pages/components/WeatherHome";
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

  const getWeatherStatus = async () => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=2584972354a8436b85b150508232601&q=${ip}&aqi=yes`
      );
      console.log(res);
    } catch (e: any) {
      console.error(e.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (ip) getWeatherStatus();
  }, [ip]);

  return (
    <>
      <Head>
        <title>weather app</title>
        <meta name="description" content="daily checker for weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Index />
      </main>
    </>
  );
};

export default Home;
