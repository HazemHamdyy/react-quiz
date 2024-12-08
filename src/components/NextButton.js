function NextButton({ dispatch, answer}) {
  return answer !== null ?  (
    <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>
      Next
    </button>
  ) : null
}

export default NextButton
