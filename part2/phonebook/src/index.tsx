import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PersonService from "./services/persons";

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

export type Person = {
  name: string;
  number: string;
  id?: number;
};
type PersonsProps = {
  persons: Person[];
  newFilter: string;
  handleDestroy: (p: Person) => void;
};

const Persons: React.FC<PersonsProps> = ({
  persons,
  newFilter,
  handleDestroy
}) => {
  return (
    <>
      {persons
        .filter(person => {
          return person.name.indexOf(newFilter) >= 0;
        })
        .map(person => (
          <p key={person.id}>
            {person.name} {person.number}
            <button
              onClick={() => {
                handleDestroy(person);
              }}
            >
              delete
            </button>
          </p>
        ))}
    </>
  );
};

type NotificationProps = {
  isError: boolean;
  message: string;
  clearMessage: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  isError,
  message,
  clearMessage
}) => {
  const [display, setDisplay] = useState("block");

  useEffect(() => {
    setDisplay("block");

    return () => {
      setTimeout(() => {
        console.log("settimeout");
        setDisplay("none");
      }, 2000);
    };
  }, [message]);

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    transition: "all 0.5s",
    display: display
  };
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    transition: "all 0.5s",
    display: display
  };

  return message && message.length > 0 ? (
    <div style={isError ? errorStyle : successStyle}>{message}</div>
  ) : null;
};

const App = () => {
  const [persons, setPersons] = useState<
    { name: string; number: string; id: number }[]
  >([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    PersonService.getAll().then(persons => {
      setPersons(persons);
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
    const personIndex = persons.findIndex(person => {
      return person.name === newName;
    });
    if (personIndex >= 0) {
      const currentPerson = persons[personIndex];
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        PersonService.update(currentPerson.id, {
          name: newName,
          number: newNumber
        })
          .then(person => {
            const clonePersons = [...persons];
            clonePersons[personIndex] = person;
            setPersons(clonePersons);
            setNewName("");
            setNewNumber("");
            setMessage(`Updated ${person.name} at ${new Date()}`);
            setIsError(false);
          })
          .catch(error => {
            if (error.response.status === 404) {
              setMessage(
                `Information of ${newName} has already been removed from server`
              );
              setIsError(true);
            }
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    PersonService.create(newPerson).then(person => {
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
      setMessage(`Added ${person.name} at ${new Date()}`);
      setIsError(false);
    });
  };

  const handleDestroy = (targetObject: Person) => {
    if (window.confirm(`Delete ${targetObject.name} ?`)) {
      PersonService.destroy(targetObject).then(res => {
        setPersons(persons.filter(p => p.id !== targetObject.id));
      });
    }
  };

  const clearMessage = () => {
    setMessage("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        isError={isError}
        message={message}
        clearMessage={clearMessage}
      />
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
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDestroy={handleDestroy}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
