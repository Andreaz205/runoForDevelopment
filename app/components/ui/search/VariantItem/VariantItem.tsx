import React, {FC} from 'react';
import styles from './VariantItem.module.scss'
import Image from "next/image";
import Link from "next/link";

const VariantItem :FC <{variant: any}>= ({variant}) => {
    return (
        <div className={styles.item}>
            <Link href={`/products/${variant.id}`}>
                <div className={styles.image}>
                    <Image src={`/storage/${variant.images[0].path}`} alt='' fill/>
                </div>
            </Link>

            <div>
                {variant.product.title} / {variant?.optionNames?.map(name => (
                    <div key={name.id}>
                        {name?.values?.map(value => (
                            <span>{value.active ? value.title + '/' : null}</span>
                        ))}
                    </div>
            ))}
            </div>
        </div>
    );
};

export default VariantItem;