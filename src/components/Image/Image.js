import {forwardRef, useState} from 'react'
import PropTypes from "prop-types";

const Image = forwardRef(({src, alt, ...props}, ref) => {

    return (
        <img
            ref={ref}
            src={src}
            alt={alt}
            {...props}
        />
    )
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
}
export default Image