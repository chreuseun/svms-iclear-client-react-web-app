import React from 'react';
import { withRouter} from "react-router-dom";
import {UserNavigation} from '../../../../../sturcture/template'
import Child from '../menuActivityCard/components/SelectedActDept/SelectedActDept';

const RefSelectedActDept = () => {

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

export default withRouter(RefSelectedActDept);
