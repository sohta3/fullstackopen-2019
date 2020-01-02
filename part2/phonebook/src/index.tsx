import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ReactDOM from "react-dom";

type FilterProps = {
  handleInputFilter: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  newFilter: string;
};

const Filter: React.FC<FilterProps> = ({ handleInputFilter, newFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleInputFilter} value={newFilter} />
    </div>
  );
};

type PersonFormProps = {
  handleAddToPersons: (event: { preventDefault: () => void }) => void;
  handleInputName: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  newName: string;
  handleInputNumber: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  newNumber: string;
};

const PersonForm: React.FC<PersonFormProps> = ({
  handleAddToPersons,
  handleInputName,
  newName,
  handleInputNumber,
  newNumber
}) => {
  return (
    <form onSubmit={handleAddToPersons}>
      <div>
        name: <input onChange={handleInputName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleInputNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

type PersonsProps = {
  persons: { name: string; number: string; id: number }[];
  newFilter: string;
};

const Persons: React.FC<PersonsProps> = ({ persons, newFilter }) => {
  return (
    <>
      {persons
        .filter(person => {
          return person.name.indexOf(newFilter) >= 0;
        })
        .map(person => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState<
    { name: string; number: string; id: number }[]
  >([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleInputFilter = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewFilter(event.target.value);
  };

  const handleInputName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewName(event.target.value);
  };

  const handleInputNumber = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewNumber(event.target.value);
  };

  const handleAddToPersons = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      persons.findIndex(person => {
        return person.name === newName;
      }) >= 0
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(
      persons.concat({ name: newName, number: newNumber, id: Math.random() })
    );
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleInputFilter={handleInputFilter} newFilter={newFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleAddToPersons={handleAddToPersons}
        handleInputName={handleInputName}
        newName={newName}
        handleInputNumber={handleInputNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
