import styles from './Content.module.scss'
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import VideoContent from "~/components/Videos/VideoContent";
import {data} from "~/data/Data";

const cx = classNames.bind(styles)

function Content() {
    return (
        <>
            {
                data.map(each => (
                    <div key={each.id} className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <Image
                                alt="image"
                                src={each.user.avatar}
                                className={cx('avatar')}
                                key={each.id}
                            />
                            <VideoContent each={each} />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Content