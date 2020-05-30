import React from 'react';
import logo from './../../../res/assets/DYCI.png';

 export default () => {
    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <img src={logo} alt={'logo'}  style={{borderWidth:1, borderColor:'black', alignSelf: 'center', width:500, height:500}}/>
        </div>
    )
}
