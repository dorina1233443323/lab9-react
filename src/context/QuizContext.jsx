import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext(null);
const QuizDispatchContext = createContext(null);

const initialState = {
    questions: [],
    currStep: 'setup',
    quizInitialData: {
        userName: '',
        category: "Toate",
        questionsNumber: 5,
        startTime: 30,
    },
    sessionQuestions: [],
    currentQuestion: 0,
    timeLeft: 0,
    answers: [],
    categoryAnswers: [],
    maxStreak: 0,
    currStreak: 0,
    score: 0,
    activeFilters: {type: 'all', category: 'Toate'}
}

function getInitialState() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : initialState;
}

function shuffle(arr){
     for (let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
     }
     return arr;
}

function quizReducer(state, action) {
    switch(action.type){
        case 'SET_QUESTIONS':
            return {...state, questions: action.questions}
        case 'SET_USERNAME':
            return {...state, quizInitialData:{...state.quizInitialData, userName: action.userName}};
        case 'SET_CATEGORY':
            return {...state, quizInitialData:{...state.quizInitialData, category: action.category}};
        case 'SET_NUMBER':
            return {...state, quizInitialData:{...state.quizInitialData, questionsNumber: action.number}};
        case 'SET_TIME':
            return {...state, quizInitialData:{...state.quizInitialData, startTime: action.time}};
        case 'GAME_QUESTIONS':
            return {...state, sessionQuestions: action.questions}
        case 'START_GAME':{
            const filterByCategory = state.quizInitialData.category === "Toate" ? state.questions : state.questions.filter(question => question.category === state.quizInitialData.category)
            const shuffled = shuffle(filterByCategory)
            const questionArr = shuffled.slice(0, state.quizInitialData.questionsNumber)
            return {...state, currStep: 'game', sessionQuestions: questionArr, currentQuestion: 0, timeLeft:state.quizInitialData.startTime};
        }
        case 'NEXT':{
            const newAnsewrs = [...state.answers, action.answer];
            let streak = 0;
            for(let i = newAnsewrs.length -1; i >= 0; i--){
                if(newAnsewrs[i].isCorrect){
                    streak++;
                }else break;
            }
            return {...state, currStep: 'game', currentQuestion: state.currentQuestion + 1, answers: newAnsewrs, currStreak: streak};
        }
        case 'SET_TIMELEFT':
            return {...state, timeLeft: action.timeLeft};
        case 'GO_TO_RESULT':{
            const totalQuestions = state.answers.length;
            const correctAnswers = state.answers.filter(answer => answer.isCorrect).length;
            const currPercent = (correctAnswers/totalQuestions)*100;
            const date = new Date();

            let allScores= JSON.parse(localStorage.getItem('scores')) || [];
            const userIndex = allScores.findIndex(s => s.userName === state.quizInitialData.userName);
            const oldScore = allScores[userIndex];
            const uppdate = !oldScore || currPercent > (oldScore.score / oldScore.total * 100);
            if(uppdate){
                let newData = {
                    userName: state.quizInitialData.userName,
                    correct: correctAnswers,
                    total: totalQuestions,
                    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                }
                if(userIndex !== -1){
                    allScores = allScores.filter(s => s.userName !== state.quizInitialData.userName);
                }
                allScores = [...allScores, newData];
                localStorage.setItem('scores', JSON.stringify(allScores))
            }
            let c = 0;
            let streak = 0;
            let filter = {};
            state.answers.forEach(answer => {
                if(answer.isCorrect === true){
                    c = c + 1;
                    if(c > streak){
                        streak = c
                    }
                }else c = 0;
        
                const cat = answer.category;
                if(!filter[cat]){
                    filter[cat] = {
                        name: cat,
                        corect: 0,
                        total: 0
                    }
                }
                filter[cat].total += 1;
                if(answer.isCorrect) filter[cat].corect += 1;
            })
            const finalFilter = Object.values(filter)
            return {...state, maxStreak:streak, currStep: 'results', categoryAnswers: finalFilter};
        }
        case 'SET_FILTERS':
            return {...state, activeFilters: { ...state.activeFilters, ...action.filters}}
        case 'START_OVER':
            localStorage.removeItem('session')
            return {...initialState, questions: state.questions, currStep:'setup'}
        default:
            return state;
    }
}

export function QuizProvider({children}){
    const [state, dispatch] = useReducer(quizReducer, getInitialState());
    useEffect(() => {
        localStorage.setItem('session', JSON.stringify(state))
    }, [state])
    return(
        <QuizContext value={state}>
            <QuizDispatchContext value={dispatch}>
                {children}
            </QuizDispatchContext>
        </QuizContext>
    )
}

export function useQuiz() {
    return useContext(QuizContext);
}

export function useQuizDispatch() {
    return useContext(QuizDispatchContext);
}