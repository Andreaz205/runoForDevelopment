import React, {FC} from 'react';
import styles from './Footer.module.scss'
import Image from "next/image";
import cn from "classnames";
import {MdOutlineArrowForwardIos} from "react-icons/md";


const Footer :FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.delivery}>
                <div>
                    <h4>Доставка по Росиии</h4>
                    <p>Чтобы заказать товар в магазине, свяжитесь с нашим менеджером по телефону +7 (495) 241-61-14</p>
                    <a href="#"><div className={styles.underline}></div>Подробнее</a>
                </div>

                <div className={styles.deliveryImage}>
                    <Image src={'/images/delivery.png'} alt='' fill/>
                </div>
            </div>


            <div className={styles.separator}></div>
            <div className={styles.footerBottom}>
                <div className={styles.footerContent}>
                <div className={cn(styles.block, styles.first)}>
                    <span>Свяжитесь с нами</span>
                    <span>+7 (351) 700-95-67</span>
                    <span>yorcom@mail.ru</span>
                    <span>Перезвоните мне</span>
                    <span>Задать вопрос</span>
                    <span>Контакты</span>
                    <span>Написать руководству</span>
                </div>
                <div className={cn(styles.block, styles.second)}>
                    <span>Режим работы call-центра</span>
                    <span>ежедневно с 10:00 до 23:59</span>
                    <span>Доставка заказов</span>
                    <span>с 9:00 до 23:00</span>
                    <span>Подписаться на рассылку</span>
                    <div className={styles.input}>
                        <input type="text" placeholder={'Введите электронную почту'}/>
                        <div className={styles.arrow}>
                            <MdOutlineArrowForwardIos />
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <span>Информация для покупателей</span>
                    <span>О компании</span>
                    <span>Доставка и оплата</span>
                    <span>Гарантия</span>
                    <span>Divan.Club</span>
                    <span>Для бизнеса</span>
                    <span>Карта сайта</span>
                </div>
                <div className={styles.block}>
                    здесь должны отобразить пара штук категорий
                </div>
                <div className={styles.block}>
                    Отзывы
                </div>
            </div>
            </div>
        </div>
    );
};

export default Footer;