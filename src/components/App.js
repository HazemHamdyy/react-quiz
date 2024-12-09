import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import FinishButton from "./FinishButton";
import RestartButton from "./RestartButton";
import Footer from "./Footer";
import Timer from "./Timer";
import ReviewButton from "./ReviewButton";
import PreviousButton from "./PreviousButton";
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answers: [],
  points: 0,
  highScore: Number(localStorage.getItem("highScore")) || 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answers: [...state.answers, action.payload],
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.questions[state.index].points + state.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "prevQuestion":
      return { ...state, index: state.index - 1 };
    case "finishQuiz":
      const highScore = Math.max(state.highScore, state.points);
      localStorage.setItem("highScore", highScore);
      return { ...state, status: "finished", highScore };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case "review":
      return { ...state, status: "review", index: 0 };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { status, questions, index, answers, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.error(`ERROR: ${err}`);
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answers={answers}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answers={answers}
              index={index}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {index + 1 === questions.length ? (
                <FinishButton
                  dispatch={dispatch}
                  hasFinished={answers.length === questions.length}
                />
              ) : (
                <NextButton
                  dispatch={dispatch}
                  hasAnswered={answers.length > index}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highScore}
            />
            <Footer>
              <ReviewButton dispatch={dispatch} />
              <RestartButton dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "review" && (
          <>
            <Progress
              index={index}
              numOfQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answers={answers}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answers={answers}
              index={index}
            />
            <RestartButton dispatch={dispatch} />
            <Footer>
              {index !== 0 && <PreviousButton dispatch={dispatch} />}
              {index + 1 !== questions.length && (
                <NextButton dispatch={dispatch} hasAnswered={true} />
              )}
            </Footer>
            
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
