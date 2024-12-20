function FinishScreen({ points, maxPossiblePoints, highScore }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = `🥇`;
  if (percentage >= 80 && percentage < 100) emoji = `🎉`;
  if (percentage >= 50 && percentage < 80) emoji = `🙃`;
  if (percentage > 0 && percentage < 50) emoji = `🤨`;
  if (percentage === 0) emoji = `🤦‍♂️`;
  return (
    <>
    <p className="result">
      <span>{emoji}</span> You Scored <strong>{points}</strong> Out of {maxPossiblePoints} (
      {Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(Highest Score: {highScore} points)</p>
    </>
  );
}

export default FinishScreen;
