// Importing Helpers
import React, { useState, useEffect } from "react";

// Importing Components/Files
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

// Functional Component
function App() {
  // State variables
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // Remove Tour
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // useEffect hook
  useEffect(() => {
    fetchTours();
  }, []);

  // Conditional Rendering
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            Refresh List
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

// Default Export
export default App;
