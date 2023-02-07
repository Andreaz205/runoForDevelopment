import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useMutation} from "react-query";
import {FileService} from "@/services/FileService";
import {toastr} from "react-redux-toastr";
import FormData from "form-data";

type TypeUpload = (onChange: (...event: any[]) => void) => {
    uploadFile: (e:ChangeEvent<HTMLInputElement>, variantId: number) => Promise<void>
    isLoading: boolean
}

export const useUpload: TypeUpload = (onChange) => {
    const [isLoading, setIsLoading] = useState(false)

    const {mutateAsync} = useMutation(
        'upload files',
        (data: FormData) => FileService.uploadImages(data),
        {
            onSuccess: ({data}) => {
                onChange(data)
            },
            onError: (error) => {
                toastr.error('error', 'Upload file')
            }
        }
    )

    const uploadFile = useCallback(async (e: ChangeEvent<HTMLInputElement>, variantId) => {
        setIsLoading(true)

        const formData = new FormData()
        const files = e.target.files
        if (!files?.length) return setIsLoading(false)

        for (let i = 0; i < files.length; i++) {
            formData.append('images[]', files[i])
        }

        await mutateAsync({formData, variantId})

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [mutateAsync])

    return useMemo(() => ({
        uploadFile, isLoading
    }), [uploadFile, isLoading])
}