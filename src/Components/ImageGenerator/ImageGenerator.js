import React, { useState } from "react";
import "./ImageGenerator.css"; // Import your CSS file for styling

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [imageSize, setImageSize] = useState("256x256");
  const [generatedImages, setGeneratedImages] = useState([]);

  const generateImages = async () => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your OpenAI API key

      const response = await fetch(
        `https://api.openai.com/v1/images/generations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          data: JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: numImages,
            size: imageSize,
            // Add any additional parameters or data you may need
          }),
        }
      );

      console.log(response)

      if (response.ok) {
        const result = await response.json();
        setGeneratedImages(result.generatedImages);
      } else {
        console.error(
          "Failed to generate images:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="dalle-container">
      <h1>DALL·E Image Generator</h1>
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
      <div className="form-group">
        <label htmlFor="numImages">Number of Images to Generate:</label>
        <select
          id="numImages"
          value={numImages}
          onChange={(e) => setNumImages(Number(e.target.value))}
        >
          {[1, 2, 3].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="imageSize">Image Size:</label>
        <select
          id="imageSize"
          value={imageSize}
          onChange={(e) => setImageSize(e.target.value)}
        >
          {["256x256", "512x512", "1024x1024"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <button className="generate-btn" onClick={generateImages}>
        Generate Images
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
