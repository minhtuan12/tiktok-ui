import styles from './EditProfile.module.scss'
import classNames from "classnames/bind";
import {faPencil, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "~/components/Image";
import {useState} from "react";
import {useStore} from "~/store";
import * as actions from '~/store/actions'
import PreviewAvatar from "~/pages/Profile/EditProfile/PreviewAvatar";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(styles)

function EditProfile({user}) {
    const users = JSON.parse(localStorage.getItem('users'))
    const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : ''

    const [count, setCount] = useState(user.bio.length)
    const [nameInput, setNameInput] = useState(user.name)
    const [usernameInput, setUsernameInput] = useState(user.username)
    const [bioInput, setBioInput] = useState(user.bio)
    const [activeSave, setActiveSave] = useState(false)
    const [error, setError] = useState(false)
    const [img, setImg] = useState(user.avatar)
    const [applyAvatar, setApplyAvatar] = useState(user.avatar)
    const [showPreviewAvatar, setShowPreviewAvatar] = useState(false)

    const [state, dispatch] = useStore()
    const navigate = useNavigate()

    const handleUsernameInput = (e) => {
        setActiveSave(true)
        setUsernameInput(e.target.value)
    }
    const handleNameInput = (e) => {
        setActiveSave(true)
        setNameInput(e.target.value)
        if (nameInput !== '')
            setActiveSave(true)
        else
            setActiveSave(false)
    }
    const handleBioInput = (e) => {
        setActiveSave(true)
        setBioInput(e.target.value)
        if (bioInput !== '')
            setActiveSave(true)
        else
            setActiveSave(false)
        setCount(e.target.value.length)

        if (e.target.value.length > 80) {
            setActiveSave(false)
            setError(true)
        }
        if (e.target.value.length < 81) {
            setActiveSave(true)
            setError(false)
        }
    }

    const handleClose = () => {
        dispatch(actions.hide_edit_profile())
    }

    const handleImage = (e) => {
        setActiveSave(true)
        setShowPreviewAvatar(true)
        const image = e.target.files[0];
        setImg(URL.createObjectURL(image))

        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.addEventListener('load', () => {
            setApplyAvatar(reader.result)
        });
    }

    const handleSaveInfo = () => {
        const newInfoObject = {
            id: user.id,
            username: usernameInput,
            name: nameInput,
            phone: user.phone,
            password: user.password,
            bio: bioInput,
            avatar: applyAvatar,
        }
        const newInfo = [{
            id: user.id,
            username: usernameInput,
            name: nameInput,
            phone: user.phone,
            password: user.password,
            bio: bioInput,
            avatar: applyAvatar,
        }]
        users[user.id - 1] = newInfoObject
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('currentUser', JSON.stringify(newInfo))
        dispatch(actions.hide_edit_profile())
        dispatch(actions.edited_profile())
        navigate(`/@${usernameInput}`)
        window.location.reload()
    }

    const handleClosePreview = () => {
        setImg(user.avatar)
        setShowPreviewAvatar(false)
    }

    return (
        <div className={cx('authen-wrapper')}>
            <div className={cx('modal-mark')}></div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('top')}>
                        Edit profile
                        <button onClick={handleClose} className={cx('close-btn')}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('item')}>
                            <div className={cx('text')}>
                                Profile photo
                            </div>
                            <div className={cx('photo-wrapper')}>
                                <div className={cx('photo')}>
                                    <Image src={img}/>
                                </div>
                                <label htmlFor="upload-img" onChange={(e) => handleImage(e)}>

                                    <div className={cx('icon-circle')}>
                                        <span>
                                            <input type="file" className={cx('upload-img')} id="upload-img"/>
                                            <FontAwesomeIcon icon={faPencil} style={{color: "#ffffff",}}/>
                                        </span>
                                    </div>
                                    {/*<img id="ouput"/>*/}
                                </label>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('text')}>
                                Username
                            </div>
                            <div>
                                {/*<input type="text" className={cx('input')} value={usernameInput}*/}
                                {/*       onChange={(e) => handleChangeInput(e.target.value, 'username')}/>*/}
                                <input placeholder="Username" type="text"
                                       className={usernameInput.length < 2 ? cx('error-input') : cx('input')}
                                       value={usernameInput}
                                       onChange={handleUsernameInput}/>
                                {usernameInput.length < 2 && (
                                    <p className={cx('no-phone-input')}>Include at least 2 characters in your
                                        username</p>
                                )}
                                <p className={cx('username-link')}>www.tiktok.com/@{usernameInput}</p>
                                <p className={cx('username-tip')}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    Username will also change your profile link.
                                </p>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('text')}>
                                Name
                            </div>
                            <div>
                                <input placeholder="Name" className={cx('input')} value={nameInput}
                                       onChange={handleNameInput}/>
                                <p className={cx('username-tip')}>
                                    Your nickname can only be changed once every 7 days.
                                </p>
                            </div>
                        </div>
                        <div className={cx('bio-item')}>
                            <div className={cx('text')}>
                                Bio
                            </div>
                            <div>
                                <textarea value={bioInput}
                                          placeholder="Bio" className={error ? cx('error-text-area') : cx('text-area')}
                                          onChange={handleBioInput}/>
                                <div className={cx('count')}>
                                    <span className={error && cx('error')}>{count}/</span>
                                    <span>80</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <button onClick={handleClose} className={cx('cancel-btn')}>Cancel</button>
                        <button onClick={handleSaveInfo}
                                className={!activeSave || error || usernameInput.length < 2 ? cx('disabled-btn') : cx('save-btn')}>Save
                        </button>
                    </div>
                </div>
                {showPreviewAvatar && <PreviewAvatar onClose={handleClosePreview} avatarUrl={img}
                                                     setShowPreviewAvatar={setShowPreviewAvatar}/>}
            </div>
        </div>
    )
}

export default EditProfile