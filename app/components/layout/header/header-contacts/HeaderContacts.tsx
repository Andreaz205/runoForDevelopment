import React, {useEffect} from 'react';
import styles from './HeaderContacts.module.scss'
import {useQuery} from "react-query";
import {ContactService} from "@/services/ContactService";
import SkeletonLoader from "@/ui/Skeleton/SkeletonLoader";
import {SessionService} from "@/services/SessionService";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const HeaderContacts = () => {
    const {fetchSessionData, openCityPopup} = useActions()
    const {isLoading: sessionIsLoading, city} = useTypedSelector(state => state.session)
    const {isLoading, data} = useQuery(
        'fetch contacts',
        () => ContactService.getContacts(),
        {
            select: ({data}) => data,
            onError: (error) => {
               alert(error)
            }
        }
    )
    useEffect(() => {
        fetchSessionData()
    }, [])

    return (
        <div className={styles.contacts}>
            {isLoading || sessionIsLoading ? (
                <SkeletonLoader count={1}/>
            ) : (
                <>
                    <span onClick={() => openCityPopup()}>{city ? city : 'Челябинск'}</span>
                    <span>{data.phone}</span>
                </>
            )}

        </div>
    );
};

export default HeaderContacts;