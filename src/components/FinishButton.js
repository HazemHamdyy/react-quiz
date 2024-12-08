function FinishButton({ dispatch, answer}) {
  return answer !== null ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finishQuiz" })}
    >
      Finish
    </button>
  ) : null;
}

export default FinishButton;
