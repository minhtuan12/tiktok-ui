import classNames from "classnames/bind";
import styles from './AccountPreview.module.scss'
import Button from "~/components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import image1 from "~/asset/image/image1.jpeg";
import image2 from "~/asset/image/image2.jpeg";
import image3 from "~/asset/image/image3.jpeg";
import {useState} from "react";
import {actions, useStore} from "~/store";

const cx = classNames.bind(styles)

function AccountPreview({account}) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const currentUserId = currentUser ? currentUser[0].id : ''

    // Follow
    const following = JSON.parse(localStorage.getItem("following"))
    const currentUserFollowing = currentUser ? following[currentUserId] : []

    const [follow, setCurrentFollow] = useState(currentUserFollowing)
    const [followed, setFollowed] = useState(false)

    const [state, dispatch] = useStore()

    const checkFollowing = (key) => {
        if (follow && follow.length > 0)
            return !!follow.some(tmp => tmp.id === key.id);
        return false
    }

    const handleFollow = (key) => {
        setFollowed(true)
        dispatch(actions.followed())

        if (!currentUser)
            dispatch(actions.show_modal())
        else {
            if (follow.includes(key)) {
                const tmpCurrentUserFollowing = currentUserFollowing.filter(each => each.id !== key.id)   // remove following account
                setCurrentFollow(tmpCurrentUserFollowing)
                following[`${currentUserId}`] = tmpCurrentUserFollowing
                dispatch(actions.unfollowed_accounts())
            } else {
                dispatch(actions.followed_accounts())
                currentUserFollowing.push(key)  // follow account
                setCurrentFollow(currentUserFollowing)
                following[`${currentUserId}`] = currentUserFollowing
            }
            localStorage.setItem("following", JSON.stringify(following))
        }
    }

    return (
        <>
            {
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <img className={cx('avatar')}
                             src={account.user.avatar}
                             alt=""/>
                        {currentUser && checkFollowing(account) ? (
                            <div className={cx('btn')}>
                                <button className={cx('followed-btn')}
                                        onClick={() => handleFollow(account.user)}>Following
                                </button>
                            </div>
                        ) : (
                            <div className={cx('btn')}>
                                <button className={cx('follow-btn')} onClick={() => handleFollow(account.user)}>Follow</button>
                            </div>
                        )}
                    </div>
                    <div className={cx('body')}>
                        <p className={cx('nickname')}>
                            <span>{account.user.username}</span>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                        </p>
                        <p className={cx('name')}>{account.user.name}</p>
                        <p className={cx('analytics')}>
                            <span className={cx('value')}>{account.user.followers}</span>
                            <span className={cx('label')}>Followers</span>
                        </p>
                        {account.user.bio &&
                            <p className={cx('bio')}>
                                {account.user.bio}
                            </p>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default AccountPreview