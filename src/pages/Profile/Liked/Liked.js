import {data} from "~/data/Data";
import classNames from "classnames/bind";
import styles from '../Profile.module.scss'
import {useState} from "react";
import {useStore} from "~/store";
import {faPlay, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function Liked() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentUserId = currentUser ? currentUser[0].id : ''

    // Like
    let likes = JSON.parse(localStorage.getItem("likes"))
    let currentUserLike = likes[currentUserId]

    let liked = []
    currentUserLike.map(each => {
        liked = data.filter(da => da.id === each)
    })

    return (
        <>
            {liked.length > 0 ? (
                <div className={cx('liked-main')}>
                    <div className={cx('liked-container')}>
                        {liked.map(video => (
                            <div key={video.id} className={cx('video-container')}>
                                <div className={cx('video')}>
                                    <video
                                        onMouseOver={e => e.target.play()}
                                        onMouseOut={e => e.target.pause()}
                                        autoPlay
                                        muted loop
                                        className={cx('video')}
                                        src={video.src}
                                    />
                                </div>
                                <div className={cx('analytic')}>
                                    <FontAwesomeIcon icon={faPlay} style={{color: "#ffffff",}}/>
                                    <strong className={cx('likes')}>{video.likes}</strong>
                                </div>
                                <div className={cx('description')}>
                                    <p>{video.description}</p>
                                    {video.tags.map(tag => (
                                        <strong key={video.id}>#{tag}</strong>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={cx('video-main')}>
                    <div className={cx('video-container')}>
                        <FontAwesomeIcon className={cx('profile-icon')} icon={faUser} style={{color: "#5a5a5a",}}/>
                        <p className={cx('video-upload')}>No liked videos yet</p>
                        <p className={cx('video-appear')}>Videos you liked will appear here</p>
                    </div>
                </div>
            )}

        </>
    )
}

export default Liked