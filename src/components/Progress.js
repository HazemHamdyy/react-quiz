function Progress({index, numOfQuestions, points, maxPossiblePoints, answers}) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={answers.length}></progress>
      <p>Question <strong>{index+1}</strong> / {numOfQuestions}</p>
      <p>points <strong>{points}</strong> / {maxPossiblePoints}</p>
      
    </header>
  )
}

export default Progress
