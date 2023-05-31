import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Shimmer from "./Shimmer";
import code from "./CountryCode.json";
const TempApp = () => {
  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [wind, setWind] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchApi = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=c94dcc6838f89a359f22d6267f4cd4a5`
      )
      .then((res) => {
        setData(res.data);
        setTemperature(res.data.main.temp);
        setHumidity(res.data.main.humidity);
        setWind(res.data.wind.speed);
        setVisibility(res.data.visibility);
      })

      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (search === "") {
      setSearch("Delhi");
    }
    setTimeout(() => {
      fetchApi();
    }, 3000);
  }, [search]);

  let visibilityy = visibility / 1000;

  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col bg-pink-200 rounded-xl p-4 w-full max-w-xs">
          <input
            className="w-2/3 m-auto  h-9 rounded-md mb-4 text-center  "
            placeholder="Search city..."
            onKeyDown={(event) => setSearch(event.target.value)}
          />
          {loading ? (
            <Shimmer />
          ) : (
            <div className="font-bold text-xl">{!loading && data.name}</div>
          )}

          <div className="text-sm text-gray-500 flex">
          </div>
          <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-xl text-indigo-400 h-24 w-24">
            {loading ? (
              <Spinner />
            ) : (
              <svg
                className="w-32 h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                ></path>
              </svg>
            )}
          </div>
          <div className="flex flex-row items-center justify-center mt-6">
            <div className="font-medium text-6xl">
              {!loading && temperature}
              {!loading && "°"}
            </div>
          </div>
          <div
            className={`flex flex-row justify-between ${
              loading ? "mt-16" : "mt-6"
            }`}
          >
            {loading ? (
              <Shimmer />
            ) : (
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">
                  {!loading && wind} k/h
                </div>
              </div>
            )}

            {loading ? (
              <Shimmer />
            ) : (
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">
                  {!loading && humidity}%
                </div>
              </div>
            )}

            {loading ? (
              <Shimmer />
            ) : (
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Visibility</div>
                <div className="text-sm text-gray-500">
                  {!loading && visibilityy} km
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempApp;
