function FinishButton({ dispatch, hasFinished}) {
  return hasFinished && (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finishQuiz" })}
    >
      Finish
    </button>
  );
}

export default FinishButton;
