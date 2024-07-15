import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGames } from "../store/gameSlice";
import YouTube from "react-youtube";

const AddGameForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    // Set initial values or handle any initial setup
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/addGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, genre, releaseDate, rating }),
    });

    if (response.ok) {
      // Fetch the updated list of games after adding a new one
      const gamesResponse = await fetch("/api/games");
      const gamesData = await gamesResponse.json();
      dispatch(setGames(gamesData));

      // Reset form fields
      setTitle("");
      setGenre("");
      setReleaseDate("");
      setRating("");
    } else {
      console.error("Failed to add game");
    }
  };

  // YouTube video options
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  // Video ID for the specific YouTube URL
  const videoId = "iXQUu5Dti4g";

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Release Date:</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <YouTube videoId={videoId} opts={opts} />
      </div>
      <button type="submit">Add Game</button>
    </form>
  );
};

export default AddGameForm;
