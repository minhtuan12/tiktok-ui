import classNames from 'classnames/bind';
import styles from '~/layouts/components/Header/Header.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleQuestion,
    faCoins, faGears, faKeyboard, faLanguage,
    faPlus, faSignOut, faUser
} from "@fortawesome/free-solid-svg-icons";
import Tippyy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import Button from "~/components/Button/Button";
import MenuItems from "~/components/Popper/Menu/Menu";
import {InboxIcon, MessagesIcon} from "~/components/Icons/Icons";
import Image from "~/components/Image/Image";
import Search from "~/layouts/components/Search/Search";
import {Link, useNavigate} from "react-router-dom";
import routeConfig from "~/config/routes";
import Login from "src/pages/Home/Login";
import {useStore, actions} from "~/store";
import SignUp from "~/pages/Home/SignUp";

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage}/>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        title: 'Keyboard shortcuts',
    }
]

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser}/>,
        title: 'View profile',
        to: '/@',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins}/>,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGears}/>,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}/>,
            title: 'Log out',
            to: '/',
            separate: true,
        },
]
// const currentUser =
//     [{
//         id: "1",
//         phone: "0123456789",
//         password: "0123456789",
//         avatar: image1,
//     }]
// localStorage.setItem("currentUser", JSON.stringify(currentUser))

function Header() {
    const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ''
    const username = currentUser ? currentUser[0].phone : ''

    const [state, dispatch] = useStore()

    const navigate = useNavigate()

    const handleMenuChange = (item) => {
        if (item === 'View profile') {
            navigate(`/@${currentUser[0].username}`)
        }
    }

    const handleLogin = (e) => {
        dispatch(actions.show_modal())
    }

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to={routeConfig.home} className={cx('logo')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="118" height="42" fill="currentColor"
                             alt="TikTok">
                            <path fill="#25F4EE"
                                  d="M9.875 11.842v-1.119A8.836 8.836 0 0 0 8.7 10.64c-4.797-.006-8.7 3.9-8.7 8.707a8.706 8.706 0 0 0 3.718 7.135A8.675 8.675 0 0 1 1.38 20.55c0-4.737 3.794-8.598 8.495-8.707Z"></path>
                            <path fill="#25F4EE"
                                  d="M10.087 24.526c2.14 0 3.89-1.707 3.966-3.83l.007-18.968h3.462a6.78 6.78 0 0 1-.109-1.202h-4.727l-.006 18.968a3.978 3.978 0 0 1-3.967 3.83 3.93 3.93 0 0 1-1.846-.46 3.949 3.949 0 0 0 3.22 1.662Zm13.905-16.36V7.111a6.506 6.506 0 0 1-3.584-1.067 6.572 6.572 0 0 0 3.584 2.122Z"></path>
                            <path fill="#FE2C55"
                                  d="M20.41 6.044a6.54 6.54 0 0 1-1.617-4.316h-1.265a6.557 6.557 0 0 0 2.881 4.316ZM8.707 15.365a3.98 3.98 0 0 0-3.974 3.976c0 1.528.87 2.858 2.134 3.523a3.937 3.937 0 0 1-.754-2.321 3.98 3.98 0 0 1 3.973-3.976c.41 0 .805.07 1.176.185v-4.833a8.852 8.852 0 0 0-1.176-.083c-.07 0-.134.006-.204.006v3.708a3.999 3.999 0 0 0-1.175-.185Z"></path>
                            <path fill="#FE2C55"
                                  d="M23.992 8.166v3.676a11.25 11.25 0 0 1-6.579-2.116v9.621c0 4.802-3.903 8.714-8.706 8.714a8.669 8.669 0 0 1-4.99-1.579 8.69 8.69 0 0 0 6.37 2.781c4.796 0 8.706-3.906 8.706-8.714v-9.621a11.25 11.25 0 0 0 6.579 2.116v-4.73a6.47 6.47 0 0 1-1.38-.148Z"></path>
                            <path fill="white"
                                  d="M17.413 19.348V9.726a11.25 11.25 0 0 0 6.58 2.116V8.166a6.572 6.572 0 0 1-3.584-2.122 6.611 6.611 0 0 1-2.887-4.316h-3.463l-.006 18.968a3.978 3.978 0 0 1-3.967 3.83 3.99 3.99 0 0 1-3.225-1.656 3.991 3.991 0 0 1-2.134-3.523A3.98 3.98 0 0 1 8.7 15.372c.409 0 .805.07 1.176.185v-3.708c-4.702.103-8.496 3.964-8.496 8.701 0 2.29.888 4.373 2.338 5.933a8.669 8.669 0 0 0 4.989 1.58c4.797 0 8.706-3.913 8.706-8.715ZM30.048 8.179h14.775l-1.355 4.232h-3.832v15.644h-4.778V12.41l-4.804.006-.006-4.238Zm38.984 0h15.12l-1.354 4.232h-4.172v15.644h-4.784V12.41l-4.803.006-.007-4.238ZM45.73 14.502h4.733v13.553h-4.708l-.026-13.553Zm6.617-6.374h4.733v9.257l4.689-4.61h5.647l-5.934 5.76 6.643 9.52h-5.213l-4.433-6.598-1.405 1.362v5.236h-4.733V8.128h.006Zm50.143 0h4.734v9.257l4.688-4.61h5.647l-5.934 5.76 6.643 9.52h-5.206l-4.433-6.598-1.405 1.362v5.236h-4.734V8.128Zm-54.397 4.826a2.384 2.384 0 1 0-.002-4.771 2.384 2.384 0 0 0 .002 4.771Z"></path>
                            <path fill="#25F4EE"
                                  d="M83.544 19.942a8.112 8.112 0 0 1 7.474-8.087 8.748 8.748 0 0 0-.709-.026c-4.478 0-8.106 3.631-8.106 8.113 0 4.482 3.628 8.113 8.106 8.113.21 0 .498-.013.71-.026-4.178-.326-7.475-3.823-7.475-8.087Z"></path>
                            <path fill="#FE2C55"
                                  d="M92.858 11.83c-.217 0-.505.012-.715.025a8.111 8.111 0 0 1 7.467 8.087 8.111 8.111 0 0 1-7.467 8.087c.21.02.498.026.715.026 4.478 0 8.106-3.631 8.106-8.113 0-4.482-3.628-8.113-8.106-8.113Z"></path>
                            <path fill="white"
                                  d="M91.58 23.887a3.94 3.94 0 0 1-3.94-3.945 3.94 3.94 0 1 1 7.882 0c0 2.18-1.77 3.945-3.941 3.945Zm0-12.058c-4.477 0-8.105 3.631-8.105 8.113 0 4.482 3.628 8.113 8.106 8.113 4.477 0 8.106-3.631 8.106-8.113 0-4.482-3.629-8.113-8.106-8.113Z"></path>
                        </svg>
                    </Link>

                    <Search/>

                    <div className={cx('actions')}>
                        {currentUser ? (
                            <>
                                <Tippyy content={'Messages'} placement={"bottom"}>
                                    <button className={cx('action-btn')}>
                                        <MessagesIcon/>
                                    </button>
                                </Tippyy>
                                <Tippyy content={'Inbox'} placement={"bottom"}>
                                    <button className={cx('action-btn')}>
                                        <InboxIcon/>
                                    </button>
                                </Tippyy>
                                <MenuItems
                                    items={userMenu}
                                    onChange={(item) => handleMenuChange(item)}
                                    delay={[300, 1000]}
                                >
                                    <Image
                                        src={currentUser[0].avatar}
                                        className={cx('user-avatar')} alt={currentUser[0].phone}/>
                                </MenuItems>
                            </>
                        ) : (
                            <>
                                <Button upload>
                                    <FontAwesomeIcon className={cx('plus-icon')} icon={faPlus}/>
                                    <span>Upload</span>
                                </Button>
                                <Button primary onClick={handleLogin}>Log in</Button>
                                <MenuItems
                                    items={MENU_ITEMS}
                                    onChange={(item) => handleMenuChange(item)}
                                >
                                    <span className={cx('more-btn')}>
                                        <svg className={cx('show-more-btn')} width="1em" data-e2e="" height="1em"
                                             viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M24 4C26.2091 4 28 5.79086 28 8C28 10.2091 26.2091 12 24 12C21.7909 12 20 10.2091 20 8C20 5.79086 21.7909 4 24 4ZM24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24C20 21.7909 21.7909 20 24 20ZM24 36C26.2091 36 28 37.7909 28 40C28 42.2091 26.2091 44 24 44C21.7909 44 20 42.2091 20 40C20 37.7909 21.7909 36 24 36Z">
                                            </path>
                                        </svg>
                                    </span>
                                </MenuItems>
                            </>
                        )}
                    </div>
                </div>
            </header>
            {/* eslint-disable-next-line no-mixed-operators */}
            {!currentUser && (
                (state.showSignupModal && <SignUp/>)
                // eslint-disable-next-line no-mixed-operators
                || (state.showModal && <Login/>))
            }
        </>
    )
}

export default Header