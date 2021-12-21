import React, { useState } from 'react'

const Header= ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
} 

const Anecdote = ({text, votes}) => (
  <div>
    <div>{text}</div>
    <div>has {votes} votes</div>
  </div>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
    
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [maxIndex, setMax] = useState(0)

  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
    const votesCpy = [...votes]
    votesCpy[selected] += 1
    setVotes(votesCpy)

    if(votesCpy[selected] > votesCpy[maxIndex]) {setMax(selected)}
  }

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={addVote} />
      <Button text="next anecdote" handleClick={newAnecdote} />
      <Header title="Anecdote with most votes" />
      <Anecdote text={anecdotes[maxIndex]} votes={votes[maxIndex]} />
    </div>
  )
}

export default App