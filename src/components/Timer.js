import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60)
  const secs = secondsRemaining % 60
  useEffect(
    function () {
      const id = setInterval(function () {
        if (secondsRemaining === 0) return dispatch({ type: "finishQuiz" });
        console.log('tick')
        return dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id)

    },
    [dispatch, secondsRemaining]
  );
  return <div className="timer">{mins < 10 && "0"}{mins}:{secs < 10 && "0"}{secs}</div>;
}

export default Timer;
