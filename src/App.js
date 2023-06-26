// import {createContext, useContext, useMemo, useReducer, useRef, useState} from "react";
// import {logDOM} from "@testing-library/react";
// import Content from "./Content";
// import './App.css'
// import {ThemeProvider} from "./ThemeContext";
// import {StoreContext} from './store'
//
// const arr = [100, 200, 300]
// const gifts = [
//     'CPU i9',
//     'RAM 32GB',
//     'RGB Keyboard'
// ]
// const courses = [
//     {
//         id: 1,
//         name: 'ABC'
//     }, {
//         id: 2,
//         name: 'DEF'
//     }, {
//         id: 3,
//         name: 'GHI'
//     }
// ]
//
// // useReducer
// // 1. init state
// // const initState = 0
// // // 2. actions
// // const UP_ACTION = 'up'
// // const DOWN_ACTION = 'down'
// //
// // // reducer
// // const reducer = (state, action) => {
// //     switch (action) {
// //         case UP_ACTION:
// //             return state + 1
// //         case DOWN_ACTION:
// //             return state - 1
// //         default:
// //             throw new Error('invalid action')
// //     }
// // }
//
// // useContext
// /*
// 1. create context
// 2. provider
// 3. consumer
//  */
//
// // export const ThemeContext = createContext()
//
// function App() {
//     // const [counter, setCounter] = useState(() => {
//     //     return arr.reduce((total, each) => total + each)
//     // })
//     // const handleIncrease = () => {
//     //     setCounter(counter + 1)
//     // }
//     //
//     // const [info, updateInfo] = useState({
//     //     name: 'ABC',
//     //     age: 20,
//     //     address: 'HN'
//     // })
//     //
//     // const handleUpdate = () => {
//     //     updateInfo({
//     //         ...info,
//     //         bio: 'qasdasdq'
//     //     })
//     // }
//     //
//     // const [gift, setGift] = useState('Chua co phan thuong')
//     //
//     // const handleGift = () => {
//     //     const index = Math.floor(Math.random() * gifts.length)
//     //     setGift(gifts[index])
//     // }
//
//
//     // const [checkId, setCheck] = useState()
//
//     // const [checkId, setCheck] = useState([])
//     //
//     // const handleCheck = (id) => {
//     //     const existed = checkId.includes(id)
//     //     setCheck(prev => {
//     //         if (existed)
//     //             return checkId.filter(each => each !== id)
//     //         else
//     //             return [...prev, id]
//     //     })
//     // }
//     // const handleSubmit = () => {
//     //     console.log(checkId)
//     // }
//
//
//     // const [task, setTask] = useState('');
//     // const [tasks, setTasks] = useState(() => {
//     //     console.log(JSON.parse(localStorage.getItem('task')))
//     //     return (JSON.parse(localStorage.getItem('task')) ?? [])   // ?? -> if storageTasks null or undefined, take []
//     // });
//     //
//     // const handleAdd = (task) => {
//     //     setTasks(prev => {
//     //         const newTasks = [...prev, task]
//     //
//     //         const jsonTask = JSON.stringify(newTasks)
//     //         localStorage.setItem('task', jsonTask)
//     //
//     //         return newTasks
//     //     })
//     //     setTask('')
//     // }
//
//     // const [show, setShow] = useState(false)
//
//     // const [count, setCount] = useState(60)
//     //
//     // const timerId = useRef({})
//     // const handleStart = () => {
//     //     timerId.current = setInterval(() => {
//     //         setCount(prev => prev - 1)
//     //     }, 1000)
//     // }
//     //
//     // const handleStop = () => {
//     //     clearInterval(timerId.current)
//     // }
//
//     // const [name, setName] = useState('')
//     // const [price, setPrice] = useState('')
//     // const [products, setProducts] = useState([])
//     //
//     // const handleSubmit = () => {
//     //     setProducts([...products, {
//     //         name,
//     //         price: +price   // convert into int
//     //     }])
//     // }
//
//     // const total = products.reduce((result, prod) => result + prod.price, 0)     // unnecessary callback
//     // const total = useMemo(() => {
//     //     const result = products.reduce((result, prod) => {
//     //         console.log('Tinh toan lai')
//     //         return result + prod.price
//     //     }, 0)
//     // })
//
//     // useReducer (complex state) ~~ useState (simple)
//     // const [count, dispatch] = useReducer(reducer, initState)
//
//     // const context = useContext(ThemeContext)
//     // const [state, dispatch] = useContext(StoreContext)
//     // console.log(state);
//
//     return (
//         // <ThemeProvider>
//             <div className="App">
//                 {/*<h1>{counter}</h1>*/}
//                 {/*<button onClick={handleIncrease}>Increase</button>*/}
//                 {/*<h1>{JSON.stringify(info)}</h1>*/}
//                 {/*<button onClick={handleUpdate}>Update</button>*/}
//                 {/*<h1>{gift}</h1>*/}
//                 {/*<button onClick={handleGift}>Lay thuong</button>*/}
//                 {/*{*/}
//                 {/*    courses.map(course => (*/}
//                 {/*        <div key={course.id}>*/}
//                 {/*            <input*/}
//                 {/*                type="radio"*/}
//                 {/*                checked={checkId === course.id}     //props checked*/}
//                 {/*                onChange={() => setCheck(course.id)}*/}
//                 {/*            />*/}
//                 {/*            {course.name}*/}
//                 {/*        </div>*/}
//                 {/*    ))*/}
//                 {/*}*/}
//
//                 {/*{*/}
//                 {/*    courses.map(course => (*/}
//                 {/*        <div key={course.id}>*/}
//                 {/*            <input*/}
//                 {/*                type="checkbox"*/}
//                 {/*                checked={checkId.includes(course.id)}*/}
//                 {/*                onChange={() => handleCheck(course.id)}*/}
//                 {/*            />*/}
//                 {/*            {course.name}*/}
//                 {/*        </div>*/}
//                 {/*    ))*/}
//                 {/*}*/}
//                 {/*<button onClick={handleSubmit}>Register</button>*/}
//
//                 {/*<input*/}
//                 {/*    value={task}*/}
//                 {/*    onChange={e => setTask(e.target.value)}*/}
//                 {/*/>*/}
//                 {/*<button onClick={() => handleAdd(task)}>ADD</button>*/}
//                 {/*<ul>*/}
//                 {/*    {*/}
//                 {/*        tasks.map((task, index) => (*/}
//                 {/*            <li key={index}>{task}</li>*/}
//                 {/*        ))*/}
//                 {/*    }*/}
//                 {/*</ul>*/}
//
//                 {/*useEffect with dependencies*/}
//                 {/*<button onClick={() => setShow(!show)}>Toggle</button>*/}
//                 {/*{show && <Content />}*/}
//
//                 {/*<h1>{count}</h1>*/}
//                 {/*<button onClick={handleStart}>Start</button>*/}
//                 {/*<button onClick={handleStop}>Stop</button>*/}
//
//                 {/*<input*/}
//                 {/*    value={name}*/}
//                 {/*    placeholder='Enter name'*/}
//                 {/*    onChange={e => setName(e.target.value)}*/}
//                 {/*/> <br />*/}
//                 {/*<input*/}
//                 {/*    value={price}*/}
//                 {/*    placeholder='Enter price'*/}
//                 {/*    onChange={e => setPrice(e.target.value)}*/}
//                 {/*/> <br />*/}
//                 {/*<button onClick={handleSubmit}>Add</button> <br/>*/}
//                 {/*Total: {total}*/}
//                 {/*<ul>*/}
//                 {/*    {*/}
//                 {/*        products.map((product, index) => (*/}
//                 {/*            <li key={index}>{product.name} - {product.price}</li>*/}
//                 {/*        ))*/}
//                 {/*    }*/}
//                 {/*</ul>*/}
//
//                 {/*<h1>{count}</h1>*/}
//                 {/*<button*/}
//                 {/*    onClick={() => dispatch(DOWN_ACTION)}*/}
//                 {/*>*/}
//                 {/*    Down*/}
//                 {/*</button>*/}
//                 {/*<button*/}
//                 {/*    onClick={() => dispatch(UP_ACTION)}*/}
//                 {/*>*/}
//                 {/*    Up*/}
//                 {/*</button>*/}
//
//                 {/*<button onClick={context.toggleTheme}> Toggle theme</button>*/}
//                 {/*<Content/>*/}
//
//
//
//             </div>
//         // </ThemeProvider>
//     );
// }
//
// export default App;

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {publicRoutes} from "~/routes/routes";
import {DefaultLayout} from "src/layouts";
import {Fragment, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import styles from '~/pages/Home/HomePage/Content.module.scss'
import classNames from "classnames/bind";
import 'animate.css'

const cx = classNames.bind(styles)

function App() {
    const [showGoToTop, setGoToTop] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setGoToTop(window.scrollY >= 200)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const handleGoToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <Router>
            <div>
                <Routes>
                    {
                        publicRoutes.map((route, index) => {
                            const Page = route.component

                            let Layout = DefaultLayout
                            if (route.layout)
                                Layout = route.layout
                            else if (route.layout === null)
                                Layout = Fragment

                            return <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {<Page/>}
                                        {
                                            showGoToTop && (
                                                <button className={cx('btn_go_top')}
                                                        style={{
                                                            position: 'fixed',
                                                            right: 20,
                                                            bottom: 20,
                                                        }}
                                                        onClick={handleGoToTop}
                                                >
                                                    <svg width="16" data-e2e="" height="16" viewBox="0 0 48 48" fill="#FFF"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M22.1086 20.3412C23.1028 19.2196 24.8972 19.2196 25.8914 20.3412L42.8955 39.5236C44.2806 41.0861 43.1324 43.5 41.004 43.5L6.99596 43.5C4.86764 43.5 3.71945 41.0861 5.10454 39.5235L22.1086 20.3412Z"></path>
                                                        <path
                                                            d="M4.5 7.5C4.5 5.84315 5.84315 4.5 7.5 4.5L40.5 4.5C42.1569 4.5 43.5 5.84315 43.5 7.5C43.5 9.15685 42.1569 10.5 40.5 10.5L7.5 10.5C5.84315 10.5 4.5 9.15685 4.5 7.5Z"></path>
                                                    </svg>
                                                </button>
                                            )}
                                    </Layout>
                                }
                            />
                        })
                    }
                </Routes>
            </div>
        </Router>
    )
}

export default App

















