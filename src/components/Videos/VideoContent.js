import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCommentDots,
    faHeart,
    faMusic,
    faShare
} from "@fortawesome/free-solid-svg-icons";
import Video from "~/components/Videos/Video";
import Button from "~/components/Button";
import MenuItems from "~/components/Popper/Menu";
import styles from '~/pages/Home/HomePage/Content.module.scss'
import classNames from "classnames/bind";
import {useState} from "react";
import {actions, useStore} from "~/store";
import {SHARE_MENU} from "~/data/Data";

const cx = classNames.bind(styles)

const VideoContent = ({each}) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUserId = currentUser ? currentUser[0].id : ''

    // Like
    let likes = JSON.parse(localStorage.getItem("likes"))
    let currentUserLike = currentUser ? likes[currentUserId] : []

    const [like, setCurrentLike] = useState(currentUserLike)
    const [liked, setLiked] = useState(false)

    // Follow
    const following = JSON.parse(localStorage.getItem("following"))
    const currentUserFollowing = currentUser ? following[currentUserId] : []

    const [follow, setCurrentFollow] = useState(currentUserFollowing)
    const [followed, setFollowed] = useState(false)

    const [state, dispatch] = useStore()

    const handleLike = (key) => {
        setLiked(true)
        dispatch(actions.liked())
        if (!currentUser)
            dispatch(actions.show_modal())
        else {
            if (!like.includes(key)) {
                currentUserLike.push(key)   // add id video that current user liked
                setCurrentLike(currentUserLike)
                likes[currentUserId] = currentUserLike
            } else {
                const tmpCurrentUserLike = currentUserLike.filter(each => each !== key)     // remove id video that current user unliked
                setCurrentLike(tmpCurrentUserLike)
                likes[currentUserId] = tmpCurrentUserLike
            }
            localStorage.setItem("likes", JSON.stringify(likes))
        }
    }

    const checkLike = (each) => {
        if (currentUserLike && currentUserLike.length > 0)
            return !!currentUserLike.includes(each.id);
        return false
    }

    const checkFollowing = (key) => {
        if (follow && follow.length > 0)
            return !!follow.some(tmp => tmp.id === key.id);
        return false
    }

    const handleFollow = (key) => {
        setFollowed(true)
        dispatch(actions.followed())
        console.log(checkFollowing(key))

        if (!currentUser)
            dispatch(actions.show_modal())
        else {
            if (checkFollowing(key)) {
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

    const handleChange = () => {
        //
    }
    return (
        <div className={cx('content')}>
            <div className={cx('text')}>
                <div className={cx('top')}>
                    <span className={cx('name')}>{each.user.username}</span>
                    <span className={cx('username')}>{each.user.name}</span>

                    <p className={cx('description')}>
                        {each.description}
                        {each.tags.map((tag, index) => (
                            <strong key={index}>#{tag} </strong>
                        ))}
                    </p>

                    <Link to='/' className={cx('music')}>
                        <div className={cx('music-icon')}>
                            <FontAwesomeIcon icon={faMusic} size="xs"
                                             style={{color: "#ffffff",}}/>
                        </div>
                        <span>
                            <strong
                                className={cx('music-desc')}
                            >
                                {each.music.name} - {each.music.author}
                            </strong>
                        </span>
                    </Link>
                </div>

                {currentUser && checkFollowing(each.user) ? (
                    <button
                        onClick={() => handleFollow(each.user)}
                        className={cx('following-btn')}
                    >
                        Following
                    </button>
                ) : (
                    <button
                        onClick={() => handleFollow(each.user)}
                        className={cx('follow-btn')}
                    >
                        Follow
                    </button>
                )}
            </div>

            <div className={cx('video-container')}>
                <div className={cx('video-wrapper')}>
                    <div className={cx('video-outside')}>
                        {each.id === 'vid1' ? (
                            <Video idVideo='vid1' url={each.src}
                                   className={cx('video')}/>
                        ) : (
                            <Video url={each.src}
                                   className={cx('video')}/>
                        )}

                    </div>
                </div>

                <div className={cx('btn')}>
                    <Button onClick={() => handleLike(each.id)} className={cx('ctn')}>
                        {currentUser && checkLike(each) ? (
                            <span data-e2e="like-icon"
                                  className={cx('liked-btn')}>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faHeart}
                                                                     style={{color: "#fe2c55",}}/>
                                                </span>
                        ) : (
                            <span data-e2e="like-icon" className={cx('like-btn')}>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faHeart}
                                                                     style={{color: "#ffffff",}}/>
                                                </span>
                        )}
                        <strong className={cx('analytics')}>{each.likes}</strong>
                    </Button>

                    {
                        currentUser ? (
                            <Link to={`/@${each.user.username}/video/${each.id}`} style={{textDecoration: 'none'}}>
                                <Button className={cx('ctn')}>
                                <span data-e2e="comment-icon" className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faCommentDots}
                                                     style={{color: "#ffffff",}}/>
                                </span>
                                    <strong className={cx('analytics')}>{each.comments}</strong>
                                </Button>
                            </Link>
                        ) : (
                            <Button onClick={() => dispatch(actions.show_modal())} className={cx('ctn')}>
                                <span data-e2e="comment-icon" className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faCommentDots}
                                                     style={{color: "#ffffff",}}/>
                                </span>
                                <strong className={cx('analytics')}>{each.comments}</strong>
                            </Button>
                        )
                    }

                    <MenuItems
                        items={SHARE_MENU}
                        onChange={handleChange}
                        share
                    >
                        {(
                            <button className={cx('share-btn')}>
                                <span data-e2e="share-icon" className={cx('action-btn')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faShare}
                                                     style={{color: "#ffffff",}}/>
                                </span>
                                <strong className={cx('analytics')}>{each.shares}</strong>
                            </button>
                        )}
                    </MenuItems>
                </div>
            </div>
        </div>
    )
}

export default VideoContent