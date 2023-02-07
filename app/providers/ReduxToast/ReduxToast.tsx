import { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'
import {useTypedSelector} from "@/hooks/useTypedSelector";


const ReduxToast:FC = () => {
    return (
        <div>
            <ReduxToastrLib
                newestOnTop={true}
                progressBar
                preventDuplicates={false}
                closeOnToastrClick
                timeOut={4000}
                transitionIn='fadeIn'
                transitionOut='fadeOut'
            />
        </div>
    )
}

export default ReduxToast