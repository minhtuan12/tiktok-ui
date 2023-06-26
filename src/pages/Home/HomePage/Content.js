import styles from './Content.module.scss'
import classNames from "classnames/bind";
import Image from "~/components/Image/Image";
import VideoContent from "~/components/Videos/VideoContent";
import {data} from "~/data/Data";
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from "~/components/Popper";
import AccountPreview from "~/components/SuggestedAccounts/AccountPreview";

const cx = classNames.bind(styles)

function Content() {

    const renderPreview = (account, props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    {
                        <AccountPreview account={account}/>
                    }
                </PopperWrapper>
            </div>
        )
    }

    return (
        <>
            {
                data.map(each => (
                    <div key={each.id} className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <Tippy
                                key={each.id}
                                interactive
                                delay={[300, 0]}
                                offset={[0, 0]}
                                render={() => (renderPreview(each))}
                                placement={"bottom-start"}
                            >
                                <Link to={`/@${each.user.username}`}
                                      style={{textDecoration: 'none', color: '#ffffff'}}>
                                    <Image
                                        alt="image"
                                        src={each.user.avatar}
                                        className={cx('avatar')}
                                        key={each.id}
                                    />
                                </Link>
                            </Tippy>
                            <VideoContent each={each}/>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Content