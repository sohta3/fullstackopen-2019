import React, { useState } from "react";
import ReactDOM from "react-dom";

type StaticProps = {
  text: string;
  value: number;
};

const Static: React.FC<StaticProps> = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

type StaticsProps = {
  good: number;
  neutral: number;
  bad: number;
  computeAverage: () => number;
  computePositive: () => number;
};

const Statics: React.FC<StaticsProps> = ({
  good,
  neutral,
  bad,
  computeAverage,
  computePositive
}) => {
  return good > 0 || neutral > 0 || bad > 0 ? (
    <>
      <h2>statics</h2>
      <table>
        <tbody>
          <Static text={"good"} value={good} />
          <Static text={"neutral"} value={neutral} />
          <Static text={"bad"} value={bad} />
          <Static text={"all"} value={good + neutral + bad} />
          <Static text={"average"} value={computeAverage()} />
          <Static text={"positive"} value={computePositive()} />
        </tbody>
      </table>
    </>
  ) : (
    <p>No feedback given</p>
  );
};

type VoteButtonProps = {
  something: string;
  vote: (something: string) => void;
};

const VoteButton: React.FC<VoteButtonProps> = ({ something, vote }) => {
  return <button onClick={() => vote(something)}>{something}</button>;
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleVote = (something: string) => {
    switch (something) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const computeAverage = () => {
    return (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);
  };

  const computePositive = () => {
    return (good / (good + neutral + bad)) * 100;
  };

  return (
    <div>
      <h2>give feedback</h2>
      <VoteButton something={"good"} vote={handleVote} />
      <VoteButton something={"neutral"} vote={handleVote} />
      <VoteButton something={"bad"} vote={handleVote} />

      <Statics
        good={good}
        neutral={neutral}
        bad={bad}
        computeAverage={computeAverage}
        computePositive={computePositive}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
