import Button from "~/components/Button";
import styles from './Login.module.scss'
import classNames from "classnames/bind";
import {symbol} from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useRef, useState} from "react";
import {ToastContainer} from "react-toastify";
import {CCloseButton} from "@coreui/react";
import Tippy from "@tippyjs/react/headless";
import {useStore} from "~/store";
import * as actions from "~/store/actions";
import {showModal} from "~/store/actions";


const cx = classNames.bind(styles)

function Login() {
    const user = localStorage.getItem("users") || ''
    const users = user ? JSON.parse(localStorage.getItem("users")).map(each => each.phone + '???' + each.password) : ''

    const [showPassword, setShowPassword] = useState(false)
    const [type, setType] = useState('password')
    const [check, setCheck] = useState(true)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const currentUser = user ? JSON.parse(localStorage.getItem("users")).filter(user => user.phone === phone) : ''

    const [state, dispatch] = useStore()

    const checkLogin = () => {
        if (!phone || !password || !users.includes(phone + '???' + password))
            return false
        else if (users.includes(phone + '???' + password))
            return true
    }
    const handleLogin = (e) => {
        if (checkLogin()) {
            dispatch(actions.login())
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
        }
        else {
            setCheck(false)
            e.preventDefault()
        }
    }

    const handleHidePassword = () => {
        setShowPassword(false)
        setType('password')
    }

    const handleShowPassword = () => {
        setShowPassword(true)
        setType('text')
    }

    const handleClose = () => {
        dispatch(actions.hideModal())
    }

    const handleHideNoti = () => {
        setCheck(true)
    }

    const showSignup = () => {
        dispatch(actions.showSignupModal())
        dispatch(actions.hideModal())
    }

    return (
        <>
            {state.showModal &&
                <div className={cx('authen-wrapper')}>
                    <div className={cx('modal-mark')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <div className={cx('form-container')}>
                                <div className={cx('form')}>
                                    <form>
                                        <h2 className={cx('login')}>Log in</h2>
                                        <div className={cx('text')}>
                                            <p>Phone</p>
                                            <span className={cx('more-detail')}>Log in with email or username</span>
                                        </div>
                                        <div className={cx('login-container')}>
                                            <div className={cx('region')}>VN +84</div>
                                            <div className={cx('phone')}>
                                                <input
                                                    className={cx('phone-input')}
                                                    placeholder="Phone number"
                                                    onChange={e => {
                                                        setPhone(e.target.value)
                                                        setCheck(true)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className={check ? cx('login-container') : cx('wrong-pw-container')}>
                                            <div className={cx('password')}>
                                                <input
                                                    type={type}
                                                    className={check ? cx('pw-input') : cx('wrong-pw-input')}
                                                    placeholder="Password"
                                                    onChange={e => {
                                                        setPassword(e.target.value)
                                                        setCheck(true)
                                                    }}
                                                />
                                            </div>
                                            <div className={cx('reveal')}>
                                                {!showPassword &&
                                                    <button className={cx('hidden-icon')} onClick={handleShowPassword}>
                                                        <FontAwesomeIcon icon={faEyeSlash} style={{color: "#989898"}}/>
                                                    </button>
                                                }
                                                {showPassword &&
                                                    <button className={cx('reveal-icon')} onClick={handleHidePassword}>
                                                        <FontAwesomeIcon icon={faEye} style={{color: "#989898"}}/>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <Tippy
                                            interactive
                                            visible={!setCheck}
                                        >
                                            <>
                                                {!check && (
                                                    <div className={cx('wrong-password')}>
                                                        <strong>Wrong password</strong>
                                                    </div>
                                                )}
                                            </>
                                        </Tippy>
                                        <div className={cx('option')}>
                                            <p className={cx('option-text')}>Forgot password?</p>
                                            <span className={cx('splitter')}></span>
                                            <p className={cx('option-text')}>Log in with code</p>
                                        </div>
                                        <div className={cx('login')}>
                                            <button onClick={handleLogin} className={cx('login-btn')}>Log in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={cx('signup')}>
                                <p>Don't have an account?</p>
                                <p className={cx('signup-btn')} onClick={showSignup}>Sign up</p>
                            </div>
                        </div>
                        <div className={cx('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faCircleXmark} size="2xl" style={{color: "#2e2e2e",}}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login