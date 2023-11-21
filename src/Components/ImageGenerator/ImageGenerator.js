import React, { useState } from 'react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1); // Default to generating 1 image
  const [imageSize, setImageSize] = useState('256x256'); // Default image size
  const [generatedImages, setGeneratedImages] = useState([]);

  const generateImages = async () => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const modelName = 'YOUR_MODEL_NAME';

      const response = await fetch(`https://api.openai.com/v1/dalle-generate/${modelName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          num_images: numImages,
          image_size: imageSize,
          // Add any additional parameters or data you may need
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedImages(result.generatedImages);
      } else {
        console.error('Failed to generate images:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>DALL·E Image Generator</h1>
      <input
        type="text"
        placeholder="Type your image prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <label>
        Number of Images to Generate:
        <select value={numImages} onChange={(e) => setNumImages(Number(e.target.value))}>
          {[1, 2, 3].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <label>
        Image Size:
        <select value={imageSize} onChange={(e) => setImageSize(e.target.value)}>
          {['256x256', '512x512', '1024x1024'].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <button onClick={generateImages}>Generate Images</button>
      {generatedImages.map((image, index) => (
        <img key={index} src={image} alt={`Generated Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageGenerator;
