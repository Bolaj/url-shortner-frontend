import React, { useState } from "react";
import axios from "axios";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_URL;
  console.log(apiBaseUrl);

  const handleShortenUrl = async () => {
    setError(""); 
    setShortUrl(""); 

    if (!longUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/shorten`, {
        originalUrl: longUrl,
      });

      if (response.status === 200 || response.status === 201) {
        setShortUrl(response.data.shortUrl);
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="py-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload on form submission
            handleShortenUrl();
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="longUrl"
            >
              Enter Link you want to shorten
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="longUrl"
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Shorten URL
            </button>
          </div>
        </form>

        {/* Display the shortened URL if available */}
        {shortUrl && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded shadow-md">
            <p className="text-sm font-semibold">Shortened URL:</p>
            <a
              href={shortUrl}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}

        <p className="text-center text-gray-500 text-xs mt-4">
          &copy;2025 Elenasy CapStone Project.
        </p>
      </div>
    </section>
  );
};

export default UrlShortener;
