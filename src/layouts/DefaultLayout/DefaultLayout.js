import classNames from "classnames/bind";
import Header from "~/layouts/components/Header/Header";
import SideBar from "~/layouts/components/SideBar/SideBar";
import styles from './DefaultLayout.module.scss';
import PropTypes from "prop-types";
import Content from "src/pages/Home/HomePage";
import {useContext} from "react";


const cx = classNames.bind(styles)

function DefaultLayout({children}) {
    return (
        <div>
            <Header/>
            <div className={cx('container')}>
                <SideBar/>
                <div className={cx('content')}>
                    {children}
                </div>
                {/*<Content />*/}
            </div>
        </div>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}
export default DefaultLayout