import React, {FC} from 'react';
import Menu from "@/ui/About/Menu";
import BigHeader from "@/ui/Catalog/BigHeader";

const Materials:FC = () => {
    return (
        <div>
            <BigHeader title={'Ткани'} />
            <Menu />
        </div>
    );
};

export default Materials;