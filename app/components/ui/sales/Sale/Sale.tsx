import React, {FC} from 'react';

const Sale: FC = ({products}) => {
    return (
        <div>
            {products && products.length && products.map(product => (
                <div>
                    {product.title}
                    {product.variants && product.variants.length &&  product.variants.map(variant => (
                        <div>{variant.title}</div>
                    ))}
                </div>
            ))}
        </div>

    );
};

export default Sale;