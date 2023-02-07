import React, {FC} from 'react';
import logo from '../../../../../public/images/gold_runo.jpg'
import Image from "next/image";

const Logo :FC= () => {
    return (
        <a href="/">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    <Image src={'https://static.insales-cdn.com/files/1/5644/23336460/original/Frame_799.png'} alt="Logo" width={100} height={50}/>
                </div>
            </div>
        </a>

    );
};

export default Logo;