import classNames from "classnames/bind";
import styles from './Menu.module.scss'
import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from '~/components/Popper'
import MenuItem from "~/components/Popper/Menu/MenuItem";
import Header from "~/components/Popper/Menu/Header";
import {useState} from "react";
import PropTypes from "prop-types";
import App from "~/App";
import {actions, useStore} from "~/store";

const cx = classNames.bind(styles)

const currentUser = JSON.parse(localStorage.getItem("currentUser"))

const defaultFn = () => {
}

function MenuItems({share = false, children, items = [], onChange = defaultFn, hideOnClick = false, placement = 'bottom'}) {
    const [history, setHistory] = useState([{data: items}])
    const current = history[history.length - 1]

    const [state, dispatch] = useStore()
    const handleLogout = (e => {
        if (e.target.innerText === 'Log out') {
            dispatch(actions.logout())
            localStorage.removeItem("currentUser")
        }
    })

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem key={index} data={item} onClick={(e) => {
                    if (isParent)
                        setHistory(prev => [...prev, item.children]);
                    else {
                        onChange(item.title)
                    }
                    handleLogout(e)
                }}/>
            )
        })
    }

    return (
        <Tippy
            interactive
            placement={placement}
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={share ? cx('share-content') : cx('content')} tabIndex="-1" {...attrs} >
                    <PopperWrapper>
                        {history.length > 1 && <Header title={current.title} onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }}/>}
                        <div className={cx('menu-body')}> {renderItems()} </div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}

MenuItems.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
}
export default MenuItems