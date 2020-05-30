import React from 'react';
import { withRouter} from "react-router-dom";
import {UserNavigation} from '../../../../../sturcture/template'
import SelectionMyDepartments from '../menuMyDepartments/SelectionMyDepartments' 

const DepartmentSelection = () => {

    const children = (data) => {
        
        const {pushToLink, userDetails} = data;
        return (
            <SelectionMyDepartments pushToLink={pushToLink} userDetails={userDetails} /> 
        )
    }

    return(
        <UserNavigation children={children} />
    )
}

export default withRouter(DepartmentSelection);
