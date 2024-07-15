import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../store/gameSlice";
import AddGameForm from "../components/AddGameForm";
import "../styles/styles.css";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch("/api/games");
      const data = await response.json();
      dispatch(setGames(data));
    }
    fetchGames();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const response = await fetch("/api/deleteGame", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      const gamesResponse = await fetch("/api/games");
      const gamesData = await gamesResponse.json();
      dispatch(setGames(gamesData));
    } else {
      console.error("Failed to delete game");
    }
  };

  return (
    <div>
      <h1>AAA Game Catalog</h1>
      <AddGameForm />
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <div>
              <strong>{game.title}</strong> - {game.genre} -{" "}
              {new Date(game.releaseDate).toLocaleDateString()} - {game.rating}
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(game.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
