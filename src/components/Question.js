function Question({ question, dispatch, answers, index }) {
  const hasAnswered = answers.length > index;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, optionIndex) => (
          <button
            className={`btn btn-option ${optionIndex === answers[index] ? "answer" : ""} ${
              hasAnswered
                ? optionIndex === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: optionIndex })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
