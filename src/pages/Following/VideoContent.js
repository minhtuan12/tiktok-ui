import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCode,
    faCommentDots, faEnvelope,
    faHeart,
    faLink,
    faMusic,
    faPaperPlane,
    faShare
} from "@fortawesome/free-solid-svg-icons";
import Video from "~/components/Videos/Video";
import Button from "~/components/Button";
import MenuItems from "~/components/Popper/Menu";
import styles from '~/pages/Home/HomePage/Content.module.scss'
import classNames from "classnames/bind";
import {
    faFacebook, faLine,
    faLinkedin, faPinterest,
    faRedditSquare,
    faTelegram,
    faTwitter,
    faWhatsappSquare
} from "@fortawesome/free-brands-svg-icons";
import {useState} from "react";
import {actions, useStore} from "~/store";
import {SHARE_MENU} from "~/data/Data";

const cx = classNames.bind(styles)

const VideoContent = ({each}) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const currentUserId = currentUser ? currentUser[0].id : ''

    // Like
    let likes = JSON.parse(localStorage.getItem("likes"))
    let currentUserLike = likes[currentUserId]

    const [like, setCurrentLike] = useState(currentUserLike)
    const [liked, setLiked] = useState(false)

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

    const handleChange = () => {
        //
    }
    return (
        <div className={cx('content')}>
            <div className={cx('text')}>
                <div className={cx('top')}>
                    <span className={cx('name')}>{each.user.name}</span>
                    <span className={cx('username')}>{each.user.nickname}</span>

                    <p className={cx('description')}>
                        {each.description}
                        {each.tags.map((tag, index) => (
                            <strong key={index}>#{tag} </strong>
                        ))}
                    </p>

                    <Link to='/' className={cx('music')} style={{ textDecoration: 'none'}}>
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
            </div>

            <div mode="0" className={cx('video-container')}>
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


                    <Button className={cx('ctn')}>
                                            <span data-e2e="comment-icon" className={cx('action-btn')}>
                                                <FontAwesomeIcon className={cx('icon')} icon={faCommentDots}
                                                                 style={{color: "#ffffff",}}/>
                                            </span>
                        <strong className={cx('analytics')}>{each.comments}</strong>
                    </Button>


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