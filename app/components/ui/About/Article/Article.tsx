import React, {FC} from 'react';
import styles from './Article.module.scss'

const Article :FC= () => {
    return (
        <div className={styles.article}>
            <span>

            Наша цель — воплотить в жизнь ваши мечты об интерьере. Обустраивайте свой дом. Создавайте обстановку, которая делает будни ярче!
            </span>
        </div>
    );
};

export default Article;