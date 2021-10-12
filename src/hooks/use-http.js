import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // Use useCallback to define a function as a dependency into the useEffect array and don't create a infinite loop.
  const sendRequest = useCallback(async (requestConfig, formatData) => {
    const { url, body, headers = {}, method = "GET" } = requestConfig;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();
      // Format data in a parent function
      formatData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
