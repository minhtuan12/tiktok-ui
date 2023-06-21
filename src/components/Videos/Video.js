import {useEffect, useRef, useState} from "react";
import {useElementOnScreen} from "~/hooks";

const Video = ({url, className}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.6,
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current && videoRef.current.play();
                } else {
                    videoRef.current && videoRef.current.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
    });

    return (
        <>
            <video id="video" controls autoPlay muted className={className} loop preload="true"
                   ref={videoRef} src={url}></video>
        </>
    );
};
export default Video;