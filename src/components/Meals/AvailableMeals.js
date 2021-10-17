import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Spinner from "../UI/Spinner";
import useHttp from "../../hooks/use-http";

const MEALS_URL =
  "https://react-meals-a7512-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();

  // Fetching data only the first time
  useEffect(() => {
    // Format data function
    const formatData = (data) => {
      const finalData = [];
      for (const key in data) {
        finalData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(finalData);
    };

    sendRequest({ url: MEALS_URL }, formatData);
  }, [sendRequest]);

  if (isLoading) {
    return <Spinner />;
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
