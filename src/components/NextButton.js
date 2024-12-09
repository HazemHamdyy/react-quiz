function NextButton({ dispatch, hasAnswered}) {
  return hasAnswered && (
    <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>
      Next
    </button>
  )
}

export default NextButton
