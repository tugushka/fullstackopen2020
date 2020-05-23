import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote, vote}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {vote} {vote>1 ? 'votes' : 'vote'}</p>
    </div>
  )
}

const AnecdoteWithMostVotes = ({anecdotes, votes}) => {
  let cur_max = votes[0], id_max = 0;
  for(let i = 1 ; i < votes.length ; i++) {
    if( votes[i] > cur_max ) {
      cur_max = votes[i];
      id_max = i;
    }
  }

  return (
    <Anecdote anecdote={anecdotes[id_max]} vote={votes[id_max]} />
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVoteClick = () => {
    let new_votes = [...votes];
    new_votes[selected]++;
    setVotes(new_votes);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <div>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={() => {setSelected( Math.floor(Math.random()*anecdotes.length) )}}>next anecdote</button>
      </div>

      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes}/>
    </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)