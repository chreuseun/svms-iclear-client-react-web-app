import React, {useEffect} from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'


// Test page
import Test from './../src/components/pages/test/test';

// < -COMPONENTS- >
import Login from '../src/components/pages/login/login'
import MenuPage from '../src/components/pages/protected/menu/menu'

// NAVBAR ADMIN
import NavbarAdmin from './components/reuse/navbar/mainmenu/NavbarAdmin';


// USER departments
import {RefMenuDepartmentClearance,ManageDeptRequirements, SelectedDepartment, DepartmentSelection} from './components/pages/protected/menu/menuUser/menuRefactorUser';
import RefRegisterSubject from './components/pages/protected/menu/menuUser/menuRefactorSubject/RefRegisterSubject';
import { UploadPaymentHistory, PaymentHistory } from './components/pages/protected/menu/menuUser';



// USER violation 
import {RefMainViolation, RefSelectedVioDept, RefVioDeptSettings} from './components/pages/protected/menu/menuUser/menuRefactorViolation/';

// USER activity
import {RefMainActCard, RefSelectedActDept} from './components/pages/protected/menu/menuUser/menuRefactorActivity';
import Scanner from './components/pages/protected/menu/menuUser/menuActivityCard/components/SelectedActDept/components/Events/components/LaunchScanner/LaunchScanner';

// Class (Overhaul)
import NewSelectedSubject from './components/pages/protected/menu/menuTeacher/NewSubject/SelectedSubject.js/SelectedSubject';

const  App = () => {

  useEffect(()=>{
    console.log('App.js - useEffect')
  },[])
  
  // redirect to Login Screen
  const RedirectToLogin = () => {
    return(
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    )
  }

  return (
    
      <div className="App">
        <Switch>
          
          <Route path="/" exact render={ (props) => <Login {...props}/> }/>
          <Route path="/menu" exact render={ (props) => <MenuPage/> }/>

          {/* ADMIN */}
          <Route path={'/menu/newuser'} exact render={ (props) => <NavbarAdmin {...props} /> } />
          <Route path={'/menu/configaccount'} exact render={ (props) => <NavbarAdmin {...props}/> } />

          <Route path={'/menu/newdepartment'} exact render={ (props) => <NavbarAdmin {...props}/> } />
          <Route path={'/menu/configdepartment'} exact render={ (props) => <NavbarAdmin {...props}/> } />

          <Route path={'/menu/config_semester'} exact render={ (props) => <NavbarAdmin {...props}/> } />
          <Route path={'/menu/config_acad_year'} exact render={ (props) => <NavbarAdmin {...props}/> } />

          <Route path={'/menu/uploadstudent'} exact render={ (props) => <NavbarAdmin {...props}/> } />
          <Route path={'/menu/students'} exact render={ (props) => <NavbarAdmin {...props}/> } />
          {/* ADMIN */}

          {/* USER */}
          <Route exact path={'/menu/dep' } render={(props) => <DepartmentSelection  {...props}/>} />

          {/* DEPARTMENTS */}
          <Route exact path={'/menu/dep/:dept'}         render={(props) => <SelectedDepartment {...props}/>} /> 
          <Route exact path={'/menu/dep/:dept/req'}     render={(props) => <ManageDeptRequirements {...props}/>} /> 
          <Route exact path={'/menu/dep/:dept/clr'}     render={(props) => <RefMenuDepartmentClearance {...props} />} /> 
          <Route exact path={'/menu/dep/:dept/sub'}     render={(props) => <RefRegisterSubject {...props} text={'subject'}/>} />
          <Route exact path={'/menu/dep/:dep/upload-payment'} render={(props) => <UploadPaymentHistory {...props} text={'subject'}/>} />
          <Route exact path={'/menu/dep/:dep/payment-history'} render={(props) => <PaymentHistory {...props} />} />
          {/* DEPARTMENTS */}

          {/* VIOLATION SYSTEM */}
          <Route  exact path={ '/menu/viol'} render={(props) => <RefMainViolation {...props}/>}/>
          <Route  exact path={'/menu/viol/:dept'} render={(props) => <RefSelectedVioDept {...props}/>}/ >  
          <Route  exact path={'/menu/viol/:dept/settings'} render={(props) => <RefVioDeptSettings {...props}/>}/>  
          {/* VIOLATION SYSTEM */}

          {/* ACTIVITY */}
          <Route  exact path={'/menu/act'}       render={(props) => <RefMainActCard {...props}/> }/>
          <Route  exact path={'/menu/act/:dept'} render={(props) => <RefSelectedActDept {...props}/> }/>

          {/* <Route  exact path={'/menu/act/:dept/scan'}  render={(props) => <NavbarUser {...props}/>} /> */}
          {/* ACTIVITY */}

          {/* SUBJECT TEACHER */}
          <Route  exact path={'/menu/subject/:subject_id'}  render={(props) => <NewSelectedSubject {...props} text={'/menu/subject/:subject_id'}/>} />

          <Route exact path={'/scanner'} render={(props) => <Scanner {...props} />}  />
          {/* USER */}
          <Route exact path={'/test'} render={()=><Test/>} />
          <Route path='*' exact={true} render={ (props) => <RedirectToLogin {...props}/> }/>

        </Switch>
      </div>  

  );
}

export default App;

  