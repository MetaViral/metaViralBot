import React, { useEffect, useState } from "react";
import "./Recipe.css";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../firebase.init";

function RecipeGenerator() {
  // const navigate = useNavigate();
  // const auth = getAuth(app);
  // useEffect( () => {
  //   onAuthStateChanged(auth,async (user) => {
  //   if (!user) {
  //    navigate('/login')
  //   } 
  //   })
  // });

  const [resultMealType, setResultMealType] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [resultDiet, setResultDiet] = useState("");
  const [resultCookingTime, setResultCookingTime] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [mealTypeError, setMealTypeError] = useState("");
  const [ingredientsError, setIngredientsError] = useState("");
  const [dietError, setDietError] = useState("");
  const [cookingTimeError, setCookingTimeError] = useState("");

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your OpenAI API key
  // const apiKey = "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";
  const handleMealTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setResultMealType([...resultMealType, value]);
    } else {
      setResultMealType(resultMealType.filter((type) => type !== value));
    }
  };

  const handleDietChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setResultDiet([...resultDiet, value]);
    } else {
      setResultDiet(resultDiet.filter((type) => type !== value));
    }
  };

  const handleCookingTimeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setResultCookingTime([...resultCookingTime, value]);
    } else {
      setResultCookingTime(resultCookingTime.filter((type) => type !== value));
    }
  };

  const handleGenerateRecipe = () => {
    // Reset error messages
    setMealTypeError("");
    setDietError("");
    setIngredientsError("");
    setCookingTimeError("");

    let valid = true;

    if (resultMealType.length === 0) {
      setMealTypeError("Please select a meal type.");
      valid = false;
    }

    if (resultDiet.length === 0) {
      setDietError("Please select a diet.");
      valid = false;
    }

    if (ingredients === "") {
      setIngredientsError("Please enter ingredients.");
      valid = false;
    }

    if (resultCookingTime === "") {
      setCookingTimeError("Please select a cooking time.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    const prompt = `You are the recipe generator. Please create a detailed step-by-step recipe with the following requirements:\n
  1. Meal type: ${resultMealType.join(", ")}\n
  2. Recipe Ingredients: ${ingredients}\n
  3. Dietary preferences (if any): ${resultDiet}\n
  4. Cooking Time: ${resultCookingTime}\n`;
    console.log(prompt);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are ChatGPT, a large language model trained by OpenAI. Answer in detail.",
          },
          { role: "user", content: prompt },
        ],
      }),
    };

    setLoading(true);
    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setOutput(data.choices[0].message.content);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API request error:", error);
      });
  };

  return (
    <div className="container">
      <div className="row mt-4 p-2">
        <div className="col-12">
          <label className="label-title">🍽️Meal Type</label>
          <span className="meal validError">{mealTypeError}</span>
          <div className="recipe-select">
            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Breakfast"
                id="Breakfast"
                onChange={handleMealTypeChange}
              ></input>
              <label htmlFor="Breakfast">
                <span>Breakfast</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Brunch"
                id="Brunch"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Brunch">
                <span>Brunch</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Lunch"
                id="Lunch"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Lunch">
                <span>Lunch</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Dinner"
                id="Dinner"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Dinner">
                <span>Dinner</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Appetizer"
                id="Appetizer"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Appetizer">
                <span>Appetizer</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Snack"
                id="Snack"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Snack">
                <span>Snack</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Dessert"
                id="Dessert"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Dessert">
                <span>Dessert</span>
              </label>
            </div>

            <div class="recipe">
              <input
                type="checkbox"
                name="recipe"
                value="Cocktail"
                id="Cocktail"
                onChange={handleMealTypeChange}
              ></input>
              <label for="Cocktail">
                <span>Cocktail</span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <label className="label-title">🥦Main Ingredients</label>
          <span className="ingredients validError">{ingredientsError}</span>
          <div className="form-group mx-auto">
            <textarea
              className="form-control"
              rows="3"
              id="ingredients"
              placeholder="Enter ingredients separated by comma..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="col-12 mt-4">
          <label className="label-title">🌰Dietary Preferences</label>
          <span className="diet validError">{dietError}</span>
          <div class="recipe-select">
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Vegetarian"
                id="Vegetarian"
                onChange={handleDietChange}
              ></input>
              <label for="Vegetarian">
                <span>Vegetarian</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Vegan"
                id="Vegan"
                onChange={handleDietChange}
              ></input>
              <label for="Vegan">
                <span>Vegan</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Gluten-free"
                id="Gluten-free"
                onChange={handleDietChange}
              ></input>
              <label for="Gluten-free">
                <span>Gluten-free</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Dairy-free"
                id="Dairy-free"
                onChange={handleDietChange}
              ></input>
              <label for="Dairy-free">
                <span>Dairy-free</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Nut-free"
                id="Nut-free"
                onChange={handleDietChange}
              ></input>
              <label for="Nut-free">
                <span>Nut-free</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Paleo"
                id="Paleo"
                onChange={handleDietChange}
              ></input>
              <label for="Paleo">
                <span>Paleo</span>
              </label>
            </div>
            <div class="recipe">
              <input type="checkbox" name="diet" value="Keto" id="Keto"></input>
              <label for="Keto">
                <span>Keto</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Pescatarian"
                id="Pescatarian"
                onChange={handleDietChange}
              ></input>
              <label for="Pescatarian">
                <span>Pescatarian</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Halal"
                id="Halal"
                onChange={handleDietChange}
              ></input>
              <label for="Halal">
                <span>Halal</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="checkbox"
                name="diet"
                value="Kosher"
                id="Kosher"
                onChange={handleDietChange}
              ></input>
              <label for="Kosher">
                <span>Kosher</span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <label className="label-title">⏰Cooking Time</label>
          <span className="cooking validError">{cookingTimeError}</span>
          <div class="recipe-select">
            <div class="recipe">
              <input
                type="radio"
                name="cooking"
                value="No preference"
                id="No preference"
                onChange={handleCookingTimeChange}
              ></input>
              <label for="No preference">
                <span>No preference</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="radio"
                name="cooking"
                value="Less than 15 minutes"
                id="Less than 15 minutes"
                onChange={handleCookingTimeChange}
              ></input>
              <label for="Less than 15 minutes">
                <span>Less than 15 minutes</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="radio"
                name="cooking"
                value="15-30 minutes"
                id="15-30 minutes"
                onChange={handleCookingTimeChange}
              ></input>
              <label for="15-30 minutes">
                <span>15-30 minutes</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="radio"
                name="cooking"
                value="30-60 minutes"
                id="30-60 minutes"
                onChange={handleCookingTimeChange}
              ></input>
              <label for="30-60 minutes">
                <span>30-60 minutes</span>
              </label>
            </div>
            <div class="recipe">
              <input
                type="radio"
                name="cooking"
                value="More than 60 minutes"
                id="More than 60 minutes"
                onChange={handleCookingTimeChange}
              ></input>
              <label for="More than 60 minutes">
                <span>More than 60 minutes</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 p-2">
        <div className="col-12 mt-4">
          <div style={{ position: "absolute" }}>
            <div id="loader" className="center"></div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ cursor: "pointer", color: "white" }}
            onClick={handleGenerateRecipe}
          >
            Generate Your Recipe Now
          </button>
        </div>
      </div>
      <div className="row mt-4 p-2">
        <div className="col-12">
          <p className="text-muted">
            ⚠ Our AI bot is still in beta, and while we strive to provide
            delicious recipes, we cannot guarantee the taste or outcome of your
            dish. These recipes are generated by AI and have not been tested in
            a physical kitchen. Please use common sense when cooking any of
            them, and if you have any concerns, consult a professional chef or
            trusted recipe source.
          </p>
          <div className="form-group mx-auto">
            <textarea
              className="form-control"
              rows="15"
              id="output"
              value={output}
              //   readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeGenerator;
