import React from 'react';
import { withRouter} from "react-router-dom";

import {UserNavigation} from '../../../../../sturcture/template'


import UploadPaymentForm from './UploadPaymentForm';

const UploadPaymentHistory = () => {

    const children = (data) => {
        
        const {pushToLink, userDetails} = data;
        return (
            <UploadPaymentForm pushToLink={pushToLink} userDetails={userDetails} /> 
        )
    }

    return(
        <UserNavigation children={children} />
    )
}

export default withRouter(UploadPaymentHistory);