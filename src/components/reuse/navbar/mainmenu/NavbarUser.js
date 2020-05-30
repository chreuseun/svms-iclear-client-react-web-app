import React from 'react';
import { withRouter, } from "react-router-dom";
import { UserNavigation } from '../../../sturcture/template';
import {DYCIBigLogo as Child} from '../../../sturcture/atoms';



const NavbarUser = () => {
    const children = () => {
        return (
            <Child/>
        )
    }

    return(
        <UserNavigation children={children} />
    )
}

export default withRouter(NavbarUser);
