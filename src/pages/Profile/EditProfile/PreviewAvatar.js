import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPencil, faXmark} from "@fortawesome/free-solid-svg-icons";
import Image from "~/components/Image";
import styles from './EditProfile.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function PreviewAvatar({onClose, avatarUrl, setShowPreviewAvatar}) {

    const handleSaveAvatar = () => {
        setShowPreviewAvatar(false)
    }

    return (
        <div className={cx('preview-wrapper')}>
            <div className={cx('top')} style={{background: 'rgb(18, 18, 18)'}}>
                <span>
                    <button onClick={onClose} className={cx('close-btn')}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{color: "#ffffff",}}/>
                    </button>
                    Edit photo
                </span>
            </div>
            <div className={cx('preview-content')}>
                <div className={cx('preview-content-container')}>
                    <div className={cx('preview-circle')}>
                        <div className={cx('image-container')}>
                            <img alt="" src={avatarUrl} className={cx('preview-image')} />
                        </div>
                    </div>
                    <div className={cx('mask')}></div>
                </div>
                <div className={cx('preview-zoom-container')}>
                    <span>Zoom</span>
                    <div className={cx('slider')}>

                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <button onClick={onClose} className={cx('cancel-btn')}>Cancel</button>
                <button onClick={handleSaveAvatar}
                        className={cx('save-btn')}>Apply
                </button>
            </div>
        </div>
    )
}

export default PreviewAvatar