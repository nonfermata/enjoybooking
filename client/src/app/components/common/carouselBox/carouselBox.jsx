import React, { useEffect, useState } from 'react';
import classes from './carouselBox.module.css';
import PropTypes from 'prop-types';

const CarouselBox = ({ children }) => {
    const gallery = children;
    const [galleryOffset, setGalleryOffset] = useState(0);

    const handlePreviousPhoto = () => {
        if (galleryOffset === 0) {
            setIndicatorActiveIndex(gallery.length - 1);
            // setGalleryOffset(-(gallery.length - 1) * 100);
        } else {
            setIndicatorActiveIndex(indicatorActiveIndex - 1);
            // setGalleryOffset(galleryOffset + 100);
        }
    };

    const handleNextPhoto = () => {
        if (galleryOffset === -(gallery.length - 1) * 100) {
            setIndicatorActiveIndex(0);
            // setGalleryOffset(0);
        } else {
            setIndicatorActiveIndex(indicatorActiveIndex + 1);
            // setGalleryOffset(galleryOffset - 100);
        }
    };

    const [indicatorActiveIndex, setIndicatorActiveIndex] = useState(0);

    const indicatorsOffset =
        (gallery.length * 26 + (gallery.length - 1) * 6) / 2;

    const handleSlideChange = (index) => {
        setIndicatorActiveIndex(index);
    };

    const [galleryClass, setGalleryClass] = useState(classes.allPhotos);

    useEffect(() => {
        setGalleryClass(classes.allPhotos + ' ' + classes.hidden);
        setTimeout(() => {
            setGalleryOffset(-(indicatorActiveIndex * 100));
            setGalleryClass(classes.allPhotos);
        }, 70);
    }, [indicatorActiveIndex]);

    const indicatorsHTML = (
        <div
            style={{ left: `calc(50% - ${indicatorsOffset}px)` }}
            className={classes.indicators}>
            {gallery.map((element, index) => (
                <div
                    key={index}
                    className={
                        classes.indicatorWrap +
                        (index === indicatorActiveIndex
                            ? ' ' + classes.indicatorWrapActive
                            : '')
                    }
                    onClick={() => handleSlideChange(index)}>
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
                onClick={handlePreviousPhoto}
                title='Previous photo'>
                &lt;
            </div>
            <div
                className={classes.control + ' ' + classes.next}
                onClick={handleNextPhoto}
                title='Next photo'>
                &gt;
            </div>
            <div className={classes.window}>
                <div
                    className={galleryClass}
                    style={{
                        transform: `translateX(${galleryOffset}%)`
                    }}>
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
