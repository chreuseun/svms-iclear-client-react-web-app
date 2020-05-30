import React, { useEffect, useState } from 'react';
import { withRouter, BrowserRouter, useHistory} from "react-router-dom";
import { Menu,  Container, Dropdown } from 'semantic-ui-react';
import axios from 'axios'
import baseURL from '../../../res/baseuri';


const NavbarUser = (props) => {

    const history = useHistory();
    const [userDetails, setUserDetails] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(()=>{
        
        let UpdateHooks = true;

        const getUserDetails = () => {

            const fetchData = async() => {

                try{
                
                    const header = {
                        headers: {
                            authorization : localStorage.getItem('x')
                        }
                    };

                    const result = await await axios.post(`${baseURL}/api/auth` ,{} ,header);

                    if(result.data.msg !== 'auth' || !result || result.data.user_details.user_type_id !== 'USER') {
                        localStorage.clear();
                        history.push("/");
                    }

                    if(UpdateHooks &&  result && result.data && result.data.user_details) {
                        const {traditional_dept = 0, violation_dept = 0, activity_dept = 0} = result.data.user_details;
                        const userData = result.data.user_details

                        const userMenuOptions = [
                            {
                                route: '/menu/dep',
                                name: 'Departments',
                                isAllowed: traditional_dept,
                            },
                            {
                                route: '/menu/viol',
                                name: 'Violations',
                                isAllowed: violation_dept,
                            },
                            {
                                route: '/menu/act',
                                name: 'Activity Card',
                                isAllowed: activity_dept,
                            }
                        ]

                        setUserDetails(userData);
                        setOptions(userMenuOptions);
                    }   
                } catch(err) {
                    localStorage.clear();
                    history.push("/");
                }
            };

            fetchData();

            return () => (UpdateHooks=false);
        };

        getUserDetails();

        return () => (UpdateHooks=false);
    },[history])

    const pushToLink = (push) => {
        history.push(push)
    }

    const pushTo = (path) => {
        history.push(path)
    }

    const HomeButton = () => {
        return(
            <>
                <Menu.Item
                    onClick={()=>pushTo('/menu')}
                >
                    HOME 
                </Menu.Item>
            </>
        )
    }

    const LogOut = () => {
        return(
            <>
                <Dropdown item text={'Welcome, ' + (userDetails.username || ' ')}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>{localStorage.clear();history.push('/')}} >Sign-Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    }

    const MapUserOption = () => {
        return(
            <>
                {options.map(option => {
                    const {route, name, isAllowed} = option;

                    if( 0 < isAllowed){
                        return(
                            <Menu.Item
                                onClick={()=>pushTo(route)}
                                name={name}
                            />
                        )
                    }else{
                        return null
                    }
                })}
            </>
        )
    }

    const MenuNav = () => (
        <Menu color='blue' style={{}} stackable inverted  fixed='top'>
            <Container>
                <HomeButton/>

                <Menu.Menu position='left'>
                    <MapUserOption/>
                </Menu.Menu>

                <Menu.Menu position='right'>
                  <LogOut/>
                </Menu.Menu>
            </Container>
        </Menu>
    )

    const RenderChildren = () => {
      return(
        <props.children pushToLink={pushToLink} userDetails={userDetails} />
      )
    }

    return(
        <React.Fragment>
            <BrowserRouter>
                <MenuNav/>
                
                <Container   style={{marginTop:"100px", padding:'20px'}}>
                    <RenderChildren/>
                </Container>
            </BrowserRouter>
        
        </React.Fragment>
    );
}


export default withRouter(NavbarUser);