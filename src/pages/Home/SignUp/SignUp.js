import styles from './SignUp.module.scss'
import classNames from "classnames/bind";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import Tippy from "@tippyjs/react/headless";
import {useStore} from "~/store";
import * as actions from "~/store/actions";
import defaultAvatar from '../../../asset/image/defaultAvatar.jpg'

const cx = classNames.bind(styles)

function SignUp() {

    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
    const userPhone = users ? users.map(each => each.phone) : []
    let id = userPhone.length > 0 ? userPhone.length + 1 : 1

    const [showPassword, setShowPassword] = useState(false)
    const [type, setType] = useState('password')

    const [check, setCheck] = useState(true)
    const [active, setActive] = useState(false)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [existUser, setExistUser] = useState(users)
    const [inValidPhone, setInValidPhone] = useState(false)

    const phoneRef = useRef(null)
    const passwordRef = useRef(null)

    const [state, dispatch] = useStore()

    const checkSignup = () => {
        if (userPhone.length > 0)
            if (!phone || !password || userPhone.includes(phone))
                return false
        if (phone.charAt(0) !== '0' || !(/^\d+$/.test(phone)) || phone.length !== 10) {
            setInValidPhone(true)
            return false
        }
        else setInValidPhone(false)
        return true
    }

    const handleChangePassword = e => {
        if (passwordRef.current.value.length !== 0 && phoneRef.current.value.length !== 0)
            setActive(true)
        else setActive(false)
        setPassword(e.target.value)
        setCheck(true)
    }

    const handleChangePhone = e => {
        if (phoneRef.current.value.length !== 0 && passwordRef.current.value.length !== 0)
            setActive(true)
        else setActive(false)
        setPhone(e.target.value)
        setCheck(true)
        setInValidPhone(false)
    }

    const handleSignup = (e) => {
        const newUser = {
            id: id++,
            phone: phone,
            password: password,
            bio: '',
            username: '',
            name: '',
            avatar: defaultAvatar,
        }

        if (checkSignup()) {
            existUser.push(newUser)
            localStorage.setItem("users", JSON.stringify(existUser))
            dispatch(actions.signedUp())
            dispatch(actions.show_modal())
            dispatch(actions.hideSignupModal())
        } else {
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
        dispatch(actions.hideSignupModal())
    }

    const showLoginModal = () => {
        dispatch(actions.hideSignupModal())
        dispatch(actions.show_modal())
    }

    return (
        <>
            {state.showSignupModal &&
                <div className={cx('authen-wrapper')}>
                    <div className={cx('modal-mark')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <div className={cx('form-container')}>
                                <div className={cx('form')}>
                                    <form>
                                        <h2 className={cx('login')}>Sign up</h2>
                                        <div className={cx('text')}>
                                            <p>Phone</p>
                                            <span className={cx('more-detail')}>Sign up with email</span>
                                        </div>
                                        <div className={check ? cx('login-container') : cx('wrong-pw-container')}>
                                            <div className={cx('region')}>VN +84</div>
                                            <div className={cx('phone')}>
                                                <input
                                                    ref={phoneRef}
                                                    className={check ? cx('pw-input') : cx('wrong-pw-input')}
                                                    placeholder="Phone number"
                                                    onChange={handleChangePhone}
                                                />
                                            </div>
                                        </div>
                                        <Tippy
                                            interactive
                                            visible={!setCheck}
                                        >
                                            <>
                                                {!check && !inValidPhone && (
                                                    <div className={cx('wrong-password')}>
                                                        <strong>Phone number already used</strong>
                                                    </div>
                                                )}
                                                {inValidPhone && !check && (
                                                    <div className={cx('wrong-password')}>
                                                        <strong>Please enter a valid phone</strong>
                                                    </div>
                                                )}
                                            </>
                                        </Tippy>
                                        <div className={cx('login-container')}>
                                            <div className={cx('password')}>
                                                <input
                                                    ref={passwordRef}
                                                    type={type}
                                                    className={cx('pw-input')}
                                                    placeholder="Password"
                                                    onChange={handleChangePassword}
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
                                        <div className={cx('login')}>
                                            <button onClick={handleSignup} className={cx('login-btn')}
                                                    style={active ? {
                                                        color: 'rgb(255, 255, 255)',
                                                        backgroundColor: 'rgb(255, 59, 92)',
                                                        cursor: 'pointer'
                                                    } : {}}>Next
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={cx('signup')}>
                                <p>Already have an account?</p>
                                <p className={cx('signup-btn')} onClick={showLoginModal}>Login</p>
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

export default SignUp