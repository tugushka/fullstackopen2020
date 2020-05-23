import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const total = good+neutral+bad;
  if( total == 0 ) {
    return (<p>No feedback given</p>)
  }
  return (
    <>
      <h1>statistics</h1>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={total}/>
      <Statistic text="average" value={(good - bad) / total}/>
      <Statistic text="positive" value={100.0 * good / total + ' %'}/>
    </>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleClick={() => {setGood(good+1)}} />
      <Button text={'neutral'} handleClick={() => {setNeutral(neutral+1)}} />
      <Button text={'bad'} handleClick={() => {setBad(bad+1)}} />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
