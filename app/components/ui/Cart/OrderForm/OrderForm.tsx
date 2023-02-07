import React, {FC, forwardRef, MutableRefObject, useState} from 'react';
import styles from "@/ui/Cart/OrderForm/OrderForm.module.scss";
import Field from "@/ui/form-elements/Field";
import {IDeliveryType, IOrderInput} from "@/ui/Cart/IOrderInput";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMutation} from "react-query";
import {OrderService} from "@/services/OrderService";
import {toastr} from "react-redux-toastr";
import {useActions} from "@/hooks/useActions";

export interface VariantsInOrder {
    id: number,
    quantity: number,
    price: number
}

const OrderForm = forwardRef<HTMLInputElement>((_,ref) => {
    const {user} = useTypedSelector(state => state.user)
    const {sum, cart} = useTypedSelector(state => state.cart)
    const {clearCart} = useActions()
    const [deliveryType, setDeliveryType] = useState<IDeliveryType>('delivery')

    const onSubmitOrderFunction: SubmitHandler<IOrderInput> = async (data) => {
        data.price = sum
        let variants: VariantsInOrder[] = []
        if (cart && cart.length) {
            cart.map(item => variants.push({
                id: item.id,
                quantity: item.count,
                price: item.price || 0,
            }))
        }
        data.variants = variants
        data.payment_variant = 'cash'
        data.delivery_type = deliveryType
        await mutateAsync(data)

    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IOrderInput>({
        mode: 'onChange'
    })

    const {mutateAsync} = useMutation(
        'post order',
        (data: IOrderInput) =>
            OrderService.sendOrder(data)
        ,
        {
            onSuccess: () => {
                toastr.success('Заказ отправлен', 'Заказ успешно отправлен и ближайшее время будет обработан менеджером')
                reset()
                clearCart()
            },
            onError: (error) => {
                toastr.error('Ошибка', 'Some error occurred!')
            }
        })

    return <div className={styles.questionnaire} ref={ref}>
        <div className={styles.blank}>

            <div className={styles.forms}>
                <span className={styles.blankHeader}>Заполните имя получателя</span>
                <div className={styles.flex}>
                    <div className={styles.formsArea}>
                        <form onSubmit={handleSubmit(onSubmitOrderFunction)}>
                            <div className={styles.additional}>Участник Золотое Руно</div>
                            <div className={styles.form}>
                                <span>Имя</span>
                                {/*<input type="text" className={styles.blankInput}*/}
                                {/*       onChange={(e) => setUserName(e.target.value)}/>*/}
                                <Field
                                    className={styles.blankInput}
                                    value={user?.name}
                                    placeholder='Введите ваше имя'
                                    error = {errors.user_name}
                                    {...register('user_name', {
                                        required: 'Поле имя обязательное'
                                    })}
                                />
                            </div>
                            <div className={styles.form}>
                                <span>Телефон</span>
                                <Field
                                    className={styles.blankInput}
                                    placeholder='Введите телефон'
                                    error = {errors.phone}
                                    type='text'
                                    {...register('phone', {
                                        required: 'Поле телефон обязательное',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Неправильный номер"
                                        }
                                    })}
                                />
                                {/*<input type="text" className={styles.blankInput}*/}
                                {/*       onChange={(e) => setPhone(e.target.value)}/>*/}
                            </div>
                            <div className={styles.form}>
                                <span>Почта</span>
                                <Field
                                    className={styles.blankInput}
                                    value={user?.email}
                                    placeholder='Введите email'
                                    error = {errors.email}
                                    {...register('email', {
                                        required: 'Поле email обязательное'
                                    })}
                                />
                                {/*<input type="text" className={styles.blankInput}*/}
                                {/*       onChange={(e) => setEmail(e.target.value)}/>*/}
                            </div>
                            <div className={styles.deliveryTitle}>Выберите способ доставки</div>
                            <div className={styles.radioButtons}>
                                <div className={styles.radio}>
                                    <Field
                                        type="radio"
                                        id='delivery-first'
                                        radioPlaceholder='Доставка'
                                        onRadioClick={setDeliveryType}
                                        radioValue='delivery'
                                        checked={deliveryType === 'delivery'}
                                        {...register('delivery_type')}
                                    />
                                    {/*<input type="radio" id='delivery-first' name='delivery'*/}
                                    {/*       checked={deliveryType === 'delivery'} onChange={() => {*/}
                                    {/*}}/>*/}
                                    {/*<label className={styles.radioLabel} form='delivery-first'*/}
                                    {/*       onClick={(e) => setDeliveryType('delivery')}>Доставка</label>*/}
                                </div>
                                <div className={styles.radio}>
                                    <Field
                                        type="radio"
                                        id='delivery-second'
                                        radioPlaceholder='Самовывоз'
                                        onRadioClick={setDeliveryType}
                                        radioValue='pickup'
                                        checked={deliveryType === 'pickup'}
                                        {...register('delivery_type')}
                                    />
                                    {/*<input type="radio" id='delivery-second' name='delivery'*/}
                                    {/*       checked={deliveryType === 'pickup'} onChange={() => {*/}
                                    {/*}}/>*/}
                                    {/*<label form='delivery-second' className={styles.radioLabel}*/}
                                    {/*       onClick={(e) => setDeliveryType('pickup')}>Самовывоз</label>*/}
                                </div>
                            </div>
                            <div className={styles.form}>
                                <span>Адрес</span>
                                <Field
                                    className={styles.blankInput}
                                    placeholder='Введите адрес'
                                    error = {errors.address}
                                    {...register('address', {
                                        required: 'Поле адрес обязательное'
                                    })}
                                />
                                {/*<input type="text" className={styles.blankInput}*/}
                                {/*       onChange={(e) => setAddress(e.target.value)}/>*/}
                            </div>
                            <div className={styles.form}>
                                <span>Добавь комментарий</span>
                                {/*<input type="text" className={styles.blankInput}*/}
                                {/*       onChange={(e) => setComment(e.target.value)}/>*/}
                                <Field
                                    className={styles.blankInput}
                                    placeholder='Добавить комментарий'
                                    error = {errors.comment}
                                    {...register('comment')}
                                />
                            </div>
                            <div className={styles.min}>
                                Оплата при получении производится после осмотра товаров. Курьер
                                принимает только наличные средства. Пожалуйста, подготовьте сумму
                                без сдачи.
                            </div>
                            <button
                                type='submit'
                                className={styles.confirmedButton}>
                                Подтверждаю заказ
                            </button>
                        </form>
                    </div>

                    <div className={styles.deliveryArea}>

                        <div className={styles.deliveryBlock}>
                            <div className={styles.title}>Доставка</div>
                            <div className={styles.item}>
                                <span>по Челябинску</span>
                                <span>
                                    700 P
                                </span>
                            </div>
                            <div className={styles.item}>
                                <span>по России</span>
                                <span>
                                   <span className={styles.pre}>от</span>  1000 P
                                </span>
                            </div>
                            <div className={styles.item}>
                                <span>Самовывоз</span>
                                <span className={styles.free}>
                                    Бесплатно
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
})

export default OrderForm;