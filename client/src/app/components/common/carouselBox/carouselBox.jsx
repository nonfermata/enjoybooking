import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './carouselBox.module.css';

const CarouselBox = ({ children: gallery }) => {
    const [touchPosition, setTouchPosition] = useState(null);
    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };
    const handleTouchMove = (e) => {
        const touchDown = touchPosition;
        if (touchDown === null) {
            return;
        }
        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;
        if (diff > 5) {
            handleSwipeNext();
        }
        if (diff < -5) {
            handleSwipePrevious();
        }
        setTouchPosition(null);
    };

    // Swiping Mode
    const galleryClass = classes.allPhotos;

    // Fading Mode
    // const [galleryClass, setGalleryClass] = useState(classes.allPhotos);

    const [galleryOffset, setGalleryOffset] = useState(0);
    const [indicatorActiveIndex, setIndicatorActiveIndex] = useState(0);
    const indicatorsOffset =
        (gallery.length * 26 + (gallery.length - 1) * 6) / 2;

    const handleClickPrevious = () => {
        if (galleryOffset === 0) {
            setIndicatorActiveIndex(gallery.length - 1);
        } else {
            setIndicatorActiveIndex(indicatorActiveIndex - 1);
        }
    };

    const handleSwipePrevious = () => {
        if (galleryOffset !== 0) {
            setIndicatorActiveIndex(indicatorActiveIndex - 1);
        }
    };

    const handleClickNext = () => {
        if (galleryOffset === -(gallery.length - 1) * 100) {
            setIndicatorActiveIndex(0);
        } else {
            setIndicatorActiveIndex(indicatorActiveIndex + 1);
        }
    };

    const handleSwipeNext = () => {
        if (galleryOffset !== -(gallery.length - 1) * 100) {
            setIndicatorActiveIndex(indicatorActiveIndex + 1);
        }
    };

    const handleSlideChange = (index) => {
        setIndicatorActiveIndex(index);
    };

    // Swiping Mode
    useEffect(() => {
        setGalleryOffset(-(indicatorActiveIndex * 100));
    }, [indicatorActiveIndex]);

    // Fading Mode
    // useEffect(() => {
    //     setGalleryClass(classes.allPhotos + ' ' + classes.hidden);
    //     setTimeout(() => {
    //         setGalleryOffset(-(indicatorActiveIndex * 100));
    //         setGalleryClass(classes.allPhotos);
    //     }, 70);
    // }, [indicatorActiveIndex]);

    const indicatorsHTML = (
        <div
            style={{ left: `calc(50% - ${indicatorsOffset}px)` }}
            className={classes.indicators}
        >
            {gallery.map((element, index) => (
                <div
                    key={index}
                    className={
                        classes.indicatorWrap +
                        (index === indicatorActiveIndex
                            ? ' ' + classes.indicatorWrapActive
                            : '')
                    }
                    onClick={() => handleSlideChange(index)}
                >
                    <div className={classes.indicator}></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={classes.mainContainer}>
            {indicatorsHTML}
            <div
                className={classes.control + ' ' + classes.previous}
                onClick={handleClickPrevious}
                title='Previous photo'
            >
                &lt;
            </div>
            <div
                className={classes.control + ' ' + classes.next}
                onClick={handleClickNext}
                title='Next photo'
            >
                &gt;
            </div>
            <div
                className={classes.window}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div
                    className={galleryClass}
                    style={{
                        transform: `translateX(${galleryOffset}%)`
                    }}
                >
                    {gallery}
                </div>
            </div>
        </div>
    );
};

CarouselBox.propTypes = {
    children: PropTypes.array.isRequired
};

export default CarouselBox;
