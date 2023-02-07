import React, {FC} from 'react';
import {useUpload} from "@/ui/form-elements/UploadField/useUpload";

export interface IUploadField {
    onChange: () => void
    placeholder: string
    error: any
    style?: any
    // value: string
}

const UploadField: FC<IUploadField> = ({
     onChange,
     placeholder,
     error,
     style,
    variantId
     // value,
 }) => {
    const {uploadFile, isLoading} = useUpload(onChange)
    return (
        <div>
            <input type="file" multiple onChange={(e) => uploadFile(e, variantId)}/>
            {error && <div>{error.message}</div>}
            {isLoading && <div>Loading...</div>}
        </div>

    );
};

export default UploadField;