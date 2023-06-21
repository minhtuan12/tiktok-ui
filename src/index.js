import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '~/reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles'
import App from "~/App";
import user1 from '~/asset/image/userAvatar1.jpeg';
import user2 from '~/asset/image/userAvatar2.jpeg';
import {StoreProvider} from "~/store";

// fake comment
// function emitComment(id) {
//     setInterval(() => {
//         window.dispatchEvent(
//             new CustomEvent(`lesson-${id}`, {
//                 detail: `Noi dung comment cua lesson ${id}`
//             })
//         )
//     }, 2000)
// }
//
// emitComment(1)
// emitComment(2)
// emitComment(3)
//
// const users = [
//     {
//         id: 1,
//         username: "nqk0010",
//         name: "Nguyễn Quốc Khánh",
//         phone: "0123456789",
//         password: "0123456789",
//         avatar: user1,
//         bio: "Làm gì có bio",
//     },
//     {
//         id: 2,
//         username: "danhdt12",
//         name: "Đoàn Tiến Danh",
//         phone: "0987654321",
//         password: "0987654321",
//         avatar: user2,
//         bio: "",
//     },
// ]

// localStorage.setItem("users", JSON.stringify(users))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <GlobalStyles>
            <StoreProvider>
                <App/>
            </StoreProvider>
        </GlobalStyles>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
