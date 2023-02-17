import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import classes from './skeletonCard.module.css';

const SkeletonCard = () => {
    return (
        <div className={classes.skeletonWrap}>
            <Skeleton className={classes.status} />
            <Skeleton className={classes.title} />
            <Skeleton className={classes.mobileTitle} />
            <Skeleton className={classes.mobileTitle} />
            <div className={classes.contentWrap}>
                <Skeleton className={classes.image} />
                <div className={classes.content}>
                    <Skeleton className={classes.subtitle} />
                    <Skeleton className={classes.simpleString} />
                    <Skeleton className={classes.simpleString} />
                    <Skeleton className={classes.simpleString} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
