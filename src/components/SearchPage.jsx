import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchPage.css";

const IMAGES_PER_PAGE = 20;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&per_page=${IMAGES_PER_PAGE}&query=${query}&client_id=${
        import.meta.env.VITE_UNSPLASH_API_KEY
      }`
    );
    setImages(response.data.results);
  };

  const handleAddCaption = (imageUrl) => {
    navigate("/add-caption", { state: { imageUrl } });
  };

  return (
    <div className="search-page">
      <h1>Image Caption Tool</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            <button onClick={() => handleAddCaption(image.urls.regular)}>
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
