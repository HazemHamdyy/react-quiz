function ReviewButton({ dispatch }) {
  return (
    <button className="btn btn-left" onClick={() => dispatch({type: 'review'})}>
      Review
    </button>
  )
}

export default ReviewButton
