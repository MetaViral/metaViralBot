import React, { useState } from "react";
import "./ImageGenerator.css"; // Import your CSS file for styling

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false); // Track generation state
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your OpenAI API key

  const generateImages = async () => {
    setIsGenerating(true);
    const apiUrl = "https://api.openai.com/v1/images/generations";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Generated Images:", responseData);

      setGeneratedImages(responseData.data.map((image) => image.url));
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsGenerating(false); // Reset the flag regardless of success or failure
    }
  };

  return (
    <div className="dalle-container">
      <h2>DALL·E Image Generator</h2>
      <div className="form-group">
        <label htmlFor="prompt">Image Prompt:</label>
        <textarea
          id="prompt"
          rows="3" // Set the number of rows to 3
          placeholder="Type your image prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button className="generate-btn" onClick={generateImages}>
        {isGenerating ? "Generating..." : "Generate Image"}
      </button>
      <div className="generated-images">
        {generatedImages.map((image, index) => (
          <img key={index} src={image} alt={`Generated Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;
