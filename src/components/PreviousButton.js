function PreviousButton({ dispatch }) {
  return (
    <button className="btn btn-left" onClick={() => dispatch({type: 'prevQuestion'})}>
      Previous
    </button>
  )
}

export default PreviousButton
