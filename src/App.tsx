import { useState, useEffect } from 'react'
import ModalForm from './components/ModalForm/ModalForm'
import { fetchPokemons } from './api/pokemonApi';

function App() {
  const [pokemons, setPokemons] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchPokemons();
      setPokemons(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <div>
      <ModalForm title='Pokemon Team' options={pokemons}/>
    </div>
  )
}

export default App
