import styles from '../Profile.module.scss'
import classNames from "classnames/bind";
import {faPlay, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function GuestVideo({data}) {
    return (
        <>
            {data[0] ? (
                <div className={cx('liked-main')}>
                    <div className={cx('liked-container')}>
                        {data.map(video => (
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
                        <p className={cx('video-upload')}>No content</p>
                        <p className={cx('video-appear')}>This user has not published any videos.</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default GuestVideo