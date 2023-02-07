import React, {Dispatch, FC, SetStateAction, useMemo} from 'react';
import {AiFillStar} from "react-icons/ai";
import styles from './FormStars.module.scss'
import cn from "classnames";

export interface IFormStar {
    id: number,
    active: boolean
}

const FormStars:FC<{setMark: Dispatch<SetStateAction<number>>, mark:  number}>= ({setMark, mark}) => {

    let stars: IFormStar[] = []
    for (let i = 1; i <= 5; i++) {
        stars.push({id: i, active: false})
    }
    const memorizedStars = useMemo(() => {

        if (mark) {
            for (let i = 1; i <= mark; i++) {
                stars.map(star => star.active = true)
            }
            for (let id = mark + 1; id <= 5; id++) {
                stars.map(star => {
                    if (star.id === id) star.active = false
                })
            }
        }
        return stars
    }, [mark])

    return (
        <div className={styles.container}>
            {memorizedStars.map(star => (
                <div key={star.id} className={cn(styles.star, {[styles.active]: star.active})} onClick={() => setMark(star.id)}>
                    <AiFillStar />
                </div>

            ))}
        </div>
    );
};

export default FormStars;