import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import spinner from "../../assets/loading.svg";

const MEALS_URL =
  "https://react-meals-a7512-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(MEALS_URL);

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();
      const finalData = [];
      for (const key in data) {
        finalData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      console.log("data fetched: ", finalData);
      setMeals(finalData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <img src={spinner} alt="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.error}>
        <p>{error}</p>
      </div>
    );
  }

  const mealsList = meals.map(({ id, name, description, price }) => (
    <MealItem
      id={id}
      key={id}
      name={name}
      description={description}
      price={price}
    />
  ));
  return (
    <Card className={classes.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
