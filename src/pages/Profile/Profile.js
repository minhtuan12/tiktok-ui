import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import Image from "~/components/Image";
import {faLock, faPenToSquare, faShare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import MenuItems from "~/components/Popper/Menu";
import {SHARE_MENU} from "~/data/Data";
import {useEffect, useRef, useState} from "react";
import Videos from "~/pages/Profile/Videos/Videos";
import Liked from "~/pages/Profile/Liked/Liked";
import {useStore} from "~/store";
import * as actions from "~/store/actions";
import EditProfile from "~/pages/Profile/EditProfile/EditProfile";
import {useParams} from "react-router-dom";
import {data} from '~/data/Data'
import NotFound from "~/pages/Profile/NotFound";
import {listUsers} from "~/data/Data";
import GuestVideo from "~/pages/Profile/Videos/GuestVideo";
import GuestLiked from "~/pages/Profile/Liked/GuestLiked";
import {Flash} from "@primer/react";

const cx = classNames.bind(styles)

function Profile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let user = currentUser ? currentUser[0] : null
    const followingAccounts = currentUser ? JSON.parse(localStorage.getItem('following'))[user.id] : []
    const followingAccountsName = followingAccounts && followingAccounts.map(each => each.name)

    const [activeTab, setActiveTab] = useState(true)
    const videoRef = useRef()
    const likeRef = useRef()
    const slideRef = useRef()
    const [account, setAccount] = useState(user)

    const [lineOffset, setLineOffset] = useState(true)

    useEffect(() => {
        if (slideRef.current) {
            if (lineOffset)
                slideRef.current.setAttribute('style', `transform: translateX(${videoRef.current.offsetLeft}px); width: ${videoRef.current.offsetWidth}px`)
            else
                slideRef.current.setAttribute('style', `transform: translateX(${likeRef.current.offsetLeft}px); width: ${likeRef.current.offsetWidth}px`)
        }
    }, [lineOffset])

    const param = useParams()
    const [layout, setLayout] = useState(1)
    const [state, dispatch] = useStore()
    // dispatch(actions.edited_profile())

    useEffect(() => {
        // if (user) {
            if (user && param.user.slice(1) === user.username) {
                setLayout(1)
                setAccount(user)
            }
        // } else {
            else if (listUsers.includes(param.user.slice(1))) {
                // eslint-disable-next-line array-callback-return
                setLayout(2)
                setAccount(data.filter(each => {
                    return param.user.slice(1) === each.user.username
                })[0].user)
            } else {
                setLayout(3)
            }
        // }
    }, [param.user.slice(1)])

    if (layout === 3)
        return <NotFound/>

    if (!account)
        return (<></>)

    return (
        <>
            {state.profile_edited ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Flash variant="success" style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        width: '25%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        Profile has been updated
                    </Flash>
                </div>
            ) : null}
            {layout !== 3 && (
                <div className={cx('wrapper')} id={"message"}>
                    <div className={cx('container')}>
                        <div className={cx('user-info')}>
                            <div className={cx('top')}>
                                <Image className={cx('avatar')} alt="avatar" src={account.avatar}/>
                                <div className={cx('username')}>
                                    <h2 className={cx('nickname')}>
                                        {account.username}
                                        {layout === 1 && (<FontAwesomeIcon className={cx('lock')} icon={faLock}
                                                                           style={{color: "#ffffff",}}/>)}
                                    </h2>
                                    <h1 className={cx('name')}>{account.name}</h1>

                                    <div className={cx('edit-profile')}>
                                        {layout === 1 ? (
                                            <button onClick={() => dispatch(actions.show_edit_profile())}
                                                    className={cx('edit-btn')}>
                                                <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare}
                                                                 style={{color: "#ffffff",}}/>
                                                <span>Edit profile</span>
                                            </button>
                                        ) : (
                                            <div style={{display: 'flex', minWidth: '100px',}}>
                                                <button
                                                    className={followingAccountsName.includes(account.name) ? cx('following-btn') : cx('follow-btn')}>{!followingAccountsName.includes(account.name) ? 'Follow' : 'Messages'}</button>
                                                {followingAccountsName.includes(account.username) &&
                                                    <Tippy content={'Unfollow'} placement={"bottom"}>
                                                        <div className={cx('followed-icon')}>
                                                            <svg width="20" data-e2e="" height="20"
                                                                 viewBox="0 0 48 48"
                                                                 fill="currentColor"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                      d="M13.0001 13C13.0001 9.68629 15.6864 7 19.0001 7C22.3139 7 25.0001 9.68629 25.0001 13C25.0001 16.3137 22.3139 19 19.0001 19C15.6864 19 13.0001 16.3137 13.0001 13ZM19.0001 3C13.4773 3 9.00015 7.47715 9.00015 13C9.00015 18.5228 13.4773 23 19.0001 23C24.523 23 29.0001 18.5228 29.0001 13C29.0001 7.47715 24.523 3 19.0001 3ZM5.19435 40.9681C6.70152 35.5144 10.0886 32.2352 13.9162 30.738C17.7125 29.2531 22.0358 29.4832 25.6064 31.2486C26.1015 31.4934 26.7131 31.338 26.9931 30.8619L28.0072 29.1381C28.2872 28.662 28.1294 28.0465 27.6384 27.7937C23.0156 25.4139 17.4034 25.0789 12.4591 27.0129C7.37426 29.0018 3.09339 33.3505 1.2883 40.0887C1.14539 40.6222 1.48573 41.1592 2.02454 41.2805L3.97575 41.7195C4.51457 41.8408 5.04724 41.5004 5.19435 40.9681ZM44.7074 30.1212C45.0979 29.7307 45.0979 29.0975 44.7074 28.707L43.2932 27.2928C42.9026 26.9023 42.2695 26.9023 41.8789 27.2928L30.0003 39.1715L25.1216 34.2928C24.7311 33.9023 24.0979 33.9023 23.7074 34.2928L22.2932 35.707C21.9026 36.0975 21.9026 36.7307 22.2932 37.1212L28.586 43.4141C29.3671 44.1952 30.6334 44.1952 31.4145 43.4141L44.7074 30.1212Z"></path>
                                                            </svg>
                                                        </div>
                                                    </Tippy>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('analytics')}>
                                <div className={cx('following')}>
                                    <strong>48</strong>
                                    <span className={cx('unit')}>Following</span>
                                </div>
                                <div className={cx('followers')}>
                                    <strong>{account.followers}</strong>
                                    <span className={cx('unit')}>Followers</span>
                                </div>
                                <div className={cx('likes')}>
                                    <strong>{account.likes}</strong>
                                    <span className={cx('unit')}>Likes</span>
                                </div>
                            </div>
                            <h2 className={cx('user-bio')}>{account.bio ? account.bio : 'No bio yet.'}</h2>
                            <MenuItems
                                placement={'bottom'}
                                items={SHARE_MENU}
                                share
                                // onChange={handleChange}
                            >
                                {(
                                    <button className={cx('share-btn')}>
                                        <FontAwesomeIcon className={cx('share-icon')} icon={faShare}
                                                         style={{color: "#ffffff",}}/>
                                    </button>
                                )}
                            </MenuItems>
                        </div>

                        <div className={cx('content')}>
                            <div className={cx('tab')}>
                                <p onMouseEnter={() => setLineOffset(true)}
                                   onMouseLeave={() => setLineOffset(activeTab)}
                                   ref={videoRef}
                                   onClick={() => setActiveTab(true)}
                                   className={cx('videos-tab', {'tab-active': activeTab})}
                                >
                                    <span>Videos</span>
                                </p>
                                <p onMouseEnter={() => setLineOffset(false)}
                                   onMouseLeave={() => setLineOffset(activeTab)}
                                   ref={likeRef}
                                   onClick={() => setActiveTab(false)}
                                   className={cx('likes-tab', {'tab-active': !activeTab})}
                                >
                                    {activeTab ? (
                                        <FontAwesomeIcon className={cx('pre-lock')} icon={faLock}
                                                         style={{color: "#898989",}}/>
                                    ) : (
                                        <FontAwesomeIcon className={cx('pre-lock')} icon={faLock}
                                                         style={{color: "#ffffff",}}/>
                                    )}
                                    <span>Liked</span>
                                </p>
                                <div ref={slideRef} className={cx('slide')}></div>
                            </div>
                            {activeTab ? (
                                <>
                                    {layout === 1 && <Videos/>}
                                    {layout === 2 && <GuestVideo
                                        data={data.filter(each => each.user.username === param.user.slice(1))}/>}
                                </>
                            ) : (
                                <>
                                    {layout === 1 && <Liked/>}
                                    {layout === 2 && <GuestLiked user={account}/>}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {state.show_edit_profile && <EditProfile user={account}/>}
        </>
    )
}

export default Profile