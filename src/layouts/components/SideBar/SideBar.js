import styles from './SideBar.module.scss'
import classNames from "classnames/bind";
import config from "~/config";
import Menu, {MenuItem} from "./Menu";
import {HomeIcon, LiveIcon, UserGroupIcon} from "~/components/Icons";
import SuggestedAccounts from "~/components/SuggestedAccounts/SuggestedAccounts";
import FollowingAccounts from "~/components/FollowingAccounts/FollowingAccounts";
import {useState} from "react";
import {useStore} from "~/store";
import Discover from "~/components/Discover/Discover";
import MoreInfo from "~/components/MoreInfo/MoreInfo";


const cx = classNames.bind(styles)

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon/>}/>
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon/>}/>
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon/>}/>
            </Menu>

            <SuggestedAccounts label="Suggested accounts"/>
            <FollowingAccounts label="Following accounts"/>
            <Discover label="Discover"/>
            <MoreInfo/>
        </aside>
    )
}

export default SideBar