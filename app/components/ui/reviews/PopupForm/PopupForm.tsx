import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import styles from './PopupForm.module.scss'
import {CSSTransition} from 'react-transition-group'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Field from "@/ui/form-elements/Field";
import {IReview, IReviewImage} from "@/ui/reviews/reviews.interface";
import {ReviewService} from "@/services/ReviewService";
import UploadField from "@/ui/form-elements/UploadField/UploadField";
import ReviewFormUploadImages from "@/ui/reviews/PopupForm/ReviewFormUploadImages/ReviewFormUploadImages";
import FormStars from "@/ui/reviews/PopupForm/FormStars/FormStars";
import {useMutation} from "react-query";
import {toastr} from "react-redux-toastr";

const PopupForm:FC<{setIsOpen: Dispatch<SetStateAction<boolean>>, isOpen: boolean, setReviews: Dispatch<SetStateAction<any>>, reviews: IReview[]}> = ({isOpen, setIsOpen, variant, setReviews, reviews}) => {
    const [images, setImages] = useState<IReviewImage[]>([])
    const [mark, setMark] = useState<number>(5)
    useEffect(() => {
        document.addEventListener('click', onClick)
        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [])

    useEffect(() => {
        if (isOpen && ref.current) {
            ref.current?.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }, [isOpen])

    const {register, handleSubmit, formState: {errors}, reset, control} = useForm<IReview>({
        mode: 'onChange'
    })

    const {mutateAsync} = useMutation(
        'store review',
        (review) => ReviewService.storeReview(review.review, review.variantId),
        {
            onSuccess: (review) => {
                toastr.success('Спасибо за отзыв!', 'Отзыв отправлен на модерацию и ближайшее время будет проверен нашим менеджером')
            },
            onError: () => {
                toastr.error('Review failed', 'some error occurred')
            }
        }
    )

    const onSubmitForm: SubmitHandler<IReview> = async (data) => {

        let imageIdsArray = images.map(image => image.id)
        data = {...data, images: imageIdsArray, mark}
        let payload = {review: data, variantId: variant.id}
        await mutateAsync(payload)

        setIsOpen(false)
        reset()
        setImages([])
    }

    const handleUploadImages = (data) => {
        setImages(data.data)
    }

    const ref = useRef<HTMLDivElement | null>(null)

    const onClick = (e: any) => {
        e.stopPropagation()
        if (!(ref.current && (e.target === ref.current || ref.current.contains(e.target)))) {
            setIsOpen(false)
            setImages([])
        }
    }

    const deleteImage = (event: any, deletedImage) => {
        event.stopPropagation()
        let newImages = images.filter(image => image.id !== deletedImage.id)
        setImages(newImages)
    }

    return (
        <>
            <CSSTransition in={isOpen} timeout={100} unmountOnExit classNames='alert'>
                <div className={styles.wrapper}>
                    <div className={styles.popup} ref={ref}>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <Field
                                placeholder='Введите номер заказа'
                                error = {errors.number}
                                {...register('number', {
                                    required: 'Поле номер заказа обязательное'
                                })}
                            />
                            <Field
                                placeholder='Введите комментарий'
                                error = {errors.content}
                                {...register('content', {
                                    required: 'Поле комментарий обязательное'
                                })}
                            />
                            <Field
                                placeholder='Введите ваше имя'
                                error = {errors.name}
                                {...register('name', {
                                    required: 'Поле имя обязательное'
                                })}
                            />
                            <Controller
                                control={control}
                                name='images'
                                defaultValue=''
                                render={({field, fieldState: {error}}) => (
                                    <UploadField
                                        onChange={handleUploadImages}
                                        placeholder={'Выберите изображения'}
                                        error={errors.images}
                                        variantId={variant.id}
                                        // value={}
                                    />
                                )}
                            />
                            <ReviewFormUploadImages images={images} deleteImage={deleteImage}/>

                            <FormStars setMark={setMark} mark={mark}/>

                            <button type='submit'>
                                Отправить
                            </button>
                        </form>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default PopupForm;