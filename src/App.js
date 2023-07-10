import './App.css';
import axios from 'axios'
import { useState,useEffect } from 'react';

  const MarvelCharacter = () => {
    const [character,setCharacter] = useState(null);

    useEffect(() => {
      const getRandomCharacter = async() =>{
        try {
          const response = await axios.get('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=f680d16d1c5e7b9177e5a9e37378f8ac&hash=fe128e49c557a766af0a11b83249cd6a');
          const characters = response.data.data.results;
          const randomIndex = Math.floor(Math.random()*characters.length);
          const randomCharacter = characters[randomIndex];
          setCharacter(randomCharacter);
        } catch(error) {
          console.log(error);
        }
      }

      const savedCharacter = localStorage.getItem('randomCharacter');
      if (savedCharacter){
        setCharacter(JSON.parse(savedCharacter));
        } else {
          getRandomCharacter();
        }
    },[]);

    useEffect(() => {
      if (character) {
        localStorage.setItem('randomCharacter', JSON.stringify(character));
      }

      return () => {
        localStorage.removeItem('randomCharacter')
      };
    }, [character]);

    return (
      <div>
        {character ? (
          <div>
            <h1>{character.name}</h1>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
          </div>
        ) : (
          <p>test</p>
        )}
        
      </div>
    );
  };


export default MarvelCharacter

