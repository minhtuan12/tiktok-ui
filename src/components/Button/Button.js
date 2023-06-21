import classNames from "classnames/bind";
import styles from './Button.module.scss'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const cx = classNames.bind(styles)

function Button({
                    to,
                    href,
                    primary = false,
                    outline = false,
                    upload = false,
                    xsmall = false,
                    small = false,
                    large = false,
                    medium = false,
                    rounded = false,
                    children,
                    disabled = false,
                    leftIcon = false,
                    rightIcon = false,
                    onClick,
                    ...passProps
                }) {
    let Comp = 'button'
    const classes = cx('wrapper', {
        primary,
        outline,
        xsmall,
        small,
        large,
        medium,
        rounded,
        leftIcon,
        rightIcon,
        upload,
        disabled,
    })

    const props = {
        onClick,
        ...passProps,
    }

    // remove event when button is disabled
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function')
                delete props[key];
        })
    }

    if (to) {
        props.to = to;
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    upload: PropTypes.bool,
    xsmall: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
}
export default Button