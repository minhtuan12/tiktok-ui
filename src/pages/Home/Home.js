import {useEffect} from "react";
import classNames from "classnames/bind";
import styles from '~/pages/Home/HomePage/Content.module.scss';
import Content from "src/pages/Home/HomePage";

const cx = classNames.bind(styles)

function Home() {

    const visbilityChange = () => {
        //
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', visbilityChange)
    }, [])
    return (
        <div className={cx('home-container')}>
            <Content/>
        </div>
    )
}

export default Home