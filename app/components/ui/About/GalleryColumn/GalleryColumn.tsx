import React, {FC} from 'react';
import styles from './GalleryColumn.module.scss'
import ImageLeftBlock from "@/ui/About/GalleryColumn/ImageLeftBlock/ImageLeftBlock";
import Image from "next/image";
import GridImages from "@/ui/About/BottomImages/GridImages/GridImages";

const GalleryColumn:FC = () => {
    return (
        <div className={styles.column}>
            <ImageLeftBlock imageUrl={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}>
                <h1>
                    Объединяем все нужное
                </h1>
                <div className={styles.text}>
                    Актуальный ассортимент позволит легко обустроить любую комнату. Мягкая мебель с лаконичным европейским дизайном, коллекция кроватей с трендовыми обивками и товары для сна собственной марки, стильные системы хранения, современные решения для кухонь и студий. Все для дома — в одном месте!
                </div>
            </ImageLeftBlock>
            <ImageLeftBlock imageUrl={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'}>
                <h1>
                    Изменения — это просто
                </h1>
                <div className={styles.text}>
                    Не подходит базовое решение? Давайте его изменим! Основные товары нашей витрины можно кастомизировать: выбрать обивку дивана в цвет штор или с легкой чисткой, спланировать наполнение шкафа для большой семьи так, чтобы было удобно всем, укомплектовать кровать подъемным механизмом для хранения самого нужного. С нашим online-конструктором это легко, попробуйте!
                </div>
            </ImageLeftBlock>
            <div className={styles.paragraph}>
                <h1>Лучше увидеть, чем услышать!</h1>
                <div className={styles.text}>
                    Мы открываем все больше шоу-румов в разных частях страны, чтобы сделать стильную мебель ближе и доступнее. Приглашаем в гости, чтобы вы могли лично оценить качество тканей и материалов, проверить комфортность наполнения, убедиться в удобстве и надежности мебели... А еще — у нас ярко и атмосферно, приходите за вдохновением!
                </div>
            </div>

            <div className={styles.gallery}>
                <div className={styles.image}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </div>
                <div className={styles.image}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </div>
                <div className={styles.image}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </div>
                <div className={styles.image}>
                    <Image src={'http://localhost:8000/storage/images/PSNVE7C6tV0KHit52U32sA7db2lvWPSIspfL5SEp.jpg'} alt='' fill/>
                </div>
            </div>
            <GridImages />
        </div>
    );
};

export default GalleryColumn;