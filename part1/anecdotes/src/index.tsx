import React, { useState } from "react";
import ReactDOM from "react-dom";

type AppProps = {
  anecdotes: string[];
};

const App: React.FC<AppProps> = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1));
  };

  const handleVote = (selected: number) => {
    const nextVotes = [...votes];
    nextVotes[selected] = nextVotes[selected] + 1;
    setVotes(nextVotes);
  };

  const findMaxVoteIndex = () => {
    const maxVote = Math.max.apply(null, votes);
    return votes.findIndex(element => {
      return element === maxVote;
    });
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[findMaxVoteIndex()]}</div>
      <div>has {votes[findMaxVoteIndex()]} votes</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
