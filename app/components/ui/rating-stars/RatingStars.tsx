import React, {FC, useMemo} from 'react';
import styles from "./RatingStars.module.scss";
import {AiFillStar} from "react-icons/ai";

const RatingStars:FC<{rating: number}> = ({rating}) => {
    console.log(rating)
    if (rating && rating > 5) {
        rating = 5
    } else if (!rating) {
        rating = 0
    }

    let numberFilledStars = useMemo(() => {
        return Math.trunc(rating)
    }, [rating])

    let remainder = useMemo(() => {
        return Number((rating - numberFilledStars + 0.01).toFixed(1))
    }, [rating, numberFilledStars])

    let numberEmptyStars = useMemo(() => {
        if (remainder !== 0) return 4 - numberFilledStars
        return 5 - numberFilledStars
    }, [numberFilledStars, remainder])

    let emptyStarsArray = []
    for (let i: number = 1; i <= numberEmptyStars; i++) {
        emptyStarsArray.push({id: i})
    }

    let filledStarsArray = []
    for (let i: number = 1; i <= numberFilledStars; i++) {
        filledStarsArray.push({id: i})
    }

    let allEmptyStarsArray = []
    for (let i: number = 1; i <= 5; i++) {
        allEmptyStarsArray.push({id: i})
    }
    return (
        <div className={styles.ratingBlock}>
            {numberEmptyStars !== 5
                ?
                remainder !== 0
                    ?
                    numberEmptyStars !== 0
                        ?
                        <div className={styles.stars}>
                            {filledStarsArray.map(star => (
                                <div key={star.id}>
                                    <AiFillStar className={styles.fill}/>
                                </div>
                            ))}
                            <div>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="grad">
                                            <stop offset={ remainder* 10 + '0%' }  stopColor="yellow"/>
                                            <stop offset={ remainder* 10 + '0%' } stopColor="black"/>
                                        </linearGradient>
                                    </defs>
                                    <path fill="url(#grad)" d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                                </svg>
                            </div>
                            {emptyStarsArray.map(star => (
                                <div key={star.id}>
                                    <AiFillStar />
                                </div>
                            ))}
                        </div>
                        :
                        <div className={styles.stars}>
                            {filledStarsArray.map(star => (
                                <div key={star.id}>
                                    <AiFillStar className={styles.fill}/>
                                </div>
                            ))}
                            <div>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="grad">
                                            <stop offset={ remainder* 10 + '0%' }  stopColor="yellow"/>
                                            <stop offset={ remainder* 10 + '0%' } stopColor="black"/>
                                        </linearGradient>
                                    </defs>
                                    <path fill="url(#grad)" d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                                </svg>
                            </div>
                        </div>

                    :
                    <div className={styles.stars}>
                        {filledStarsArray.map(star => (
                            <div key={star.id}>
                                <AiFillStar className={styles.fill}/>
                            </div>
                        ))}
                        {emptyStarsArray.map(star => (
                            <div key={star.id}>
                                <AiFillStar />
                            </div>
                        ))}
                    </div>


                :
                <div className={styles.stars}>
                    {
                        allEmptyStarsArray.map(star => (
                            <div key={star.id}>
                                <AiFillStar />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default RatingStars;