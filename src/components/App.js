import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(petType){
    console.log(petType)
    setFilters({type: petType})
    }

  function onFindPetsClick(){
    if(filters.type === 'all'){
    fetch("http://localhost:3001/pets")
      .then(response => response.json())
      .then(petData => {
        setPets(petData)
      })
  }else{
    fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(response => response.json())
      .then(petData => {
        setPets(petData)
      })
  }}

  function onAdoptPet(id){
    setPets(pets.map((pet) =>
        pet.id === id ? {...pet, isAdopted: true} : pet))
  }


  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
              />
          </div>
          <div className="twelve wide column">
            <PetBrowser
              pets={pets} 
              onAdoptPet={onAdoptPet}
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
