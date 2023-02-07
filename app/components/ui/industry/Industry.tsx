import React, {FC} from 'react';
import Menu from "@/ui/About/Menu";
import BigHeader from "@/ui/Catalog/BigHeader";

const Industry :FC= () => {
    return (
        <div>
            <BigHeader title={'Производство Yorcom'} />
            <Menu />
        </div>
    );
};

export default Industry;