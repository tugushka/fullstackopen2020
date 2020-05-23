import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, bad, neutral}) => {
  const total = good+neutral+bad;
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad) / total}</p>
      <p>positive {100.0 * good / total} %</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => {setGood(good+1)}}>good</button>
      <button onClick={() => {setNeutral(neutral+1)}}>neutral</button>
      <button onClick={() => {setBad(bad+1)}}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
