import React from 'react';
import Def from 'autocomplete-lhc';

function SearchDiseases() {

  new Def.Autocompleter.Search('condition',
    'https://clinicaltables.nlm.nih.gov/api/conditions/v3/search');
                

  return (
    <div className="div-container">
        <h1>Search Medical Conditions</h1>
        <input type="text" id="condition" placeholder="Condition"/>
    </div>
  )
}

export default SearchDiseases;

