import './App.css'
import { useState } from 'react';


function App() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);

  const randomDogImage = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error('Error Fetching image', error);
      alert('Failed to Fetch dog image. Please try again');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="title"><h1>API Apps</h1></div>
      <div className="container">
        <div className="card1">
          <button onClick={randomDogImage}>
            Random Dog Image
          </button>
        </div>
        <div className="card2">
          {loading ? (
            <p>Loading..</p>
          ): (
            dogImage && <img src={dogImage} alt="Dog Image"></img>
        )}
          
        </div>
      </div>
      
      
    </>
  )
}

export default App
