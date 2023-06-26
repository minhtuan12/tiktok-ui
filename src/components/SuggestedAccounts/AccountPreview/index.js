import classNames from "classnames/bind";
import styles from './AccountPreview.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {actions, useStore} from "~/store";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles)

function AccountPreview({account}) {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const currentUserId = currentUser ? currentUser[0].id : ''

    // Follow
    const following = JSON.parse(localStorage.getItem("following"))
    const currentUserFollowing = currentUser ? following[currentUserId] : []

    const [follow, setCurrentFollow] = useState(currentUserFollowing.map(each => each.id))

    const [state, dispatch] = useStore()

    const handleFollow = (key) => {
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
                        <Link to={`/@${account.user.username}`} style={{textDecoration: 'none', color: '#ffffff'}}>
                            <img className={cx('avatar')}
                                 src={account.user.avatar}
                                 alt=""/>
                        </Link>
                        {currentUser && follow && follow.includes(account.user.id) ? (
                            <div className={cx('btn')}>
                                <button className={cx('followed-btn')}
                                        onClick={() => handleFollow(account.user)}>Following
                                </button>
                            </div>
                        ) : (
                            <div className={cx('btn')}>
                                <button className={cx('follow-btn')}
                                        onClick={() => handleFollow(account.user)}>Follow
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={cx('body')}>
                        <p className={cx('nickname')}>
                            <Link to={`/@${account.user.username}`} style={{textDecoration: 'none', color: '#ffffff'}}>
                                <span>{account.user.username}</span>
                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                            </Link>
                        </p>
                        <Link to={`/@${account.user.username}`} style={{textDecoration: 'none', color: '#ffffff'}}>
                            <p className={cx('name')}>{account.user.name}</p>
                        </Link>
                        <p className={cx('analytics')}>
                            <span className={cx('value')}>{account.user.followers}</span>
                            <span className={cx('label')}>Followers</span>
                            <span className={cx('value')}>{account.user.likes}</span>
                            <span className={cx('label')}>Likes</span>
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