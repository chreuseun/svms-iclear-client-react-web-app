import React from 'react';
import { withRouter } from "react-router-dom";
import {UserNavigation} from '../../../../../sturcture/template'
import Child from './PaymentHistory' 


const ManageDeptRequirement = () => {

    const children = (data) => {
        
        const {pushToLink, userDetails} = data;
        return (
            <Child pushToLink={pushToLink} userDetails={userDetails} /> 
        )
    }

    return(
        <UserNavigation children={children} />
    )
}

const Routed = withRouter(ManageDeptRequirement);

export default Routed;