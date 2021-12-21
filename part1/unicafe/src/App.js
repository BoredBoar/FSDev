import React, { useState } from 'react'

const Header= ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
} 

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({title, good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h1>{title}</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>average {(good - bad)/(good + neutral + bad)}</div>
      <div>positive {good/(good + neutral + bad) * 100} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const title = "give feedback"
  const statistics = "statistics"

  const newRating = rating => {
    switch(rating) {
      case "good":
        setGood(good + 1)
        break
      case "neutral":
        setNeutral(neutral + 1)
        break
      case "bad":
        setBad(bad + 1)
        break
      default:
        console.log("Unknown button click:",rating)
    }
  }

  return (
    <div>
      <Header title={title} />
      <Button handleClick={() => newRating("good")} text="good" />
      <Button handleClick={() => newRating("neutral")} text="neutral" />
      <Button handleClick={() => newRating("bad")} text="bad" />
      <Statistics title={statistics} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App