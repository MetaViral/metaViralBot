import React, { useState } from "react";
import "./ImageGenerator.css"; // Import your CSS file for styling

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [imageSize, setImageSize] = useState("256x256");
  const [generatedImages, setGeneratedImages] = useState([]);

  const generateImages = async () => {
    const apiUrl = 'https://api.openai.com/v1/images/generations';
  
    const requestData = {
      model: 'dall-e-3',
      prompt: prompt,
      n: numImages,
      size: imageSize,
    };
  
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });
  
      console.log('Generated Images:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="dalle-container">
      <h1>DALL·E Image Generato</h1>
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
