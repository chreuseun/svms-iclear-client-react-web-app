import React, {  useState, useEffect } from 'react'
import { Form, Header,Segment, Button,Divider, Label, Container, Dropdown, Radio} from 'semantic-ui-react'
import axios from 'axios';
import { withRouter} from "react-router-dom";

import baseURL from '../../../../../res/baseuri';
import Loader from '../../../../reuse/loader';


const  FormExampleSubcomponentControl=  (props) => {
    const {history} = props;

    const [loader, setLoader] = useState(true);
    const [ type , setType ] = useState([]);  // dept type ADMIN OR USER
    const [ acadlevel , setAcadLevel] = useState([]);  // Academic Level
    const [ course , setCourse ] = useState([]);  // Course
    const [ yearlevel , setYearLevel ] = useState([]);  // Yearlevel
    const [ subdata , setSubDate ] = useState([]); // subdata
    const [crsDept, setCrsDept] = useState([]); // crsDept

    const [ valDeptName, setValDeptName] = useState('');
    const [ valType, setValType ] = useState('');
    const [ valAcadLevel, setValAcadLevel ] = useState('');
    const [ valCourse, setValCourse ] = useState('');
    const [ valYearLevel, setValYearLevel ] = useState('');
    const [ valHeadOff, setValHeadOff] = useState('');
    const [ valCrsDept, setValCrsDept ] = useState('');
    const [ valIsChecked, setValIsChecked] = useState('none');
    
    useEffect(() => {
        const header = {
            headers: {
                authorization : localStorage.getItem('x')
            }
        }

        const x = async()=>{
            try{
              const authorization = await await axios.post(`${baseURL}/api/auth` ,{} ,header);

              if(
                authorization.data.msg !== 'auth' || !authorization || authorization.data.user_details.user_type_id !== 'ADMIN') {
                  localStorage.clear();
                  history.push('/');
                  return 
              }

              let result = await axios.post(`${baseURL}/api/departmentstype/get`,{},header);
              setType(result.data.sqlResult)

              result = await axios.post(`${baseURL}/api/educlevel/get`,{},header);
              setAcadLevel(result.data.sqlResult)

              result = await axios.post(`${baseURL}/api/educcourselevel/get`,{},header);
              setSubDate(result.data.sqlResult)

              setLoader(false)

            } catch(err) {
              history.push('/')
              /*
              
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ1c2VybmFtZSI6ImV1bmlsbGVVU0VSIiwidXNlcl90eXBlX2lkIjoiQURNSU4iLCJ0cmFkaXRpb25hbF9kZXB0IjowLCJ2aW9sYXRpb25fZGVwdCI6MCwiYWN0aXZpdHlfZGVwdCI6MCwiaWF0IjoxNjI5ODYyMDU4LCJleHAiOjE2Mjk5NDg0NTh9.3IwXynOjFvZ7kUBf9yNg0JfrGvP3o3VTW422k_yZHlo"
              */
            } 
        }

        x();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ON SUBMIT
    const onSubmit = async(e) => {
      e.preventDefault();   

      if(
        valDeptName.trim() === ''    || valType  === ''   ||
        valAcadLevel  === ''  || valCourse === '' ||
        valYearLevel === ''   || valHeadOff.trim() === '' || 
        setValCrsDept === '' 
      ) {
        alert("Please suppliment required fields")

      } else {
        setLoader(true);

        let body = {
          valDeptName  : valDeptName,
          valType  : valType,
          valAcadLevel  : valAcadLevel,
          valCourse : valCourse ,
          valYearLevel : valYearLevel,
          valHeadOff : valHeadOff,
          valCrsDept: valCrsDept,
          valIsChecked : valIsChecked
        }

        console.log('body to send,', body)
  
        let headers ={
          headers:{
            authorization : localStorage.getItem('x')
          }
        }
  
        let response = await axios.post(`${baseURL}/api/departmentinsert`, body, headers)
  
        if(response) {
          setValDeptName('');
          setValType('') ;
          setValAcadLevel('') ;
          setValCourse('') ;
          setValYearLevel('');
          setValHeadOff('');
          setValCrsDept('');

          alert('Department Added');
        } else {
          alert('Adding Department Failed...');
        }
      }

     

      setLoader(false)

      // ************************************************************************************
    }

    // ON Dept TYPE CHANGE
    const type_handleChange = (e, { value }) => {
      setValType(value)
      setValIsChecked('none')
      console.log(valType)
    }

    // ACADLEVEL CAHNGE
    const acadlevel_handleChange = async(e, { value }) => {
        
      setValAcadLevel(value)
      setCrsDept([])
      setYearLevel([]);
      setCourse([]);
      setValCrsDept('')
      setValYearLevel('');
      setValCourse('');
 
        try{

          const header = {
            headers: {
                authorization : localStorage.getItem('x')
            }
          }

          let data_crsDept = await axios.get(`${baseURL}/api/departments/coursedepartment/${value}`,header);
          setCrsDept(data_crsDept.data.data)


        } catch(err) {
                props.history.push('/')
        }  
    }

    // Course Changed
    const course_handleChange = (e, { value }) => {
      setValCourse(value);
      console.log(valCourse)
    }

    // Yearlevel Changed
    const yearlevel_handleChange = (e, { value }) => {
      setValYearLevel(value);
      console.log(valYearLevel)
    }

    // Dept Changed
    const crsDept_handleChange = (e, { value }) => {
      
      setValCrsDept(value);
      setYearLevel([]);
      setCourse([]);
      setValYearLevel('');
      setValCourse('');


      let filter=( subdata.course.filter((item)=> {
        return (item.educ_level_id === valAcadLevel && item.department === value ) 
      }) )

      console.log('filter COURSE: ', filter)

      let filter1=( subdata.yearlevel.filter((item)=> {
        return item.educ_level_id === valAcadLevel  
      }) )

      if(value === 'ALL') {
        setCourse( [ ...filter.map((it, idx) => { 
          return {key:it.course,value:it.course, text: it.course }
        }) ] );
  
      } else {
        setCourse( [ {key:'ALL', value: 'ALL', text: 'ALL' }, ...filter.map((it, idx) => { 
          return {key:it.course,value:it.course, text: it.course }
        }) ] );
      }

      setYearLevel( filter1.map((it, idx) => {
        return {key:it.yearlevel,value:it.yearlevel, text: it.yearlevel }
      }))
    }

    const onIsRadio_handleChange = (e, {value}) => {
      console.log(value);
      setValIsChecked(value)
    } 

    const TradionSubDept = () => {

      return(
          <React.Fragment>
            {/* SELECT [NONE, REG, FIN] */}
 
              <Form.Group widths='equal'  >
                <Form.Field>
                  <Radio
                    
                    value='none'
                    label='none'
                    name='radioGroup'
                    checked={valIsChecked === 'none'}
                    onChange={onIsRadio_handleChange}
                  />  
                </Form.Field>

                <Form.Field>
                  <Radio
                    
                    label='Is Finance?'
                    name='radioGroup'
                    value='fin'
                    checked={valIsChecked === 'fin'}
                    onChange={onIsRadio_handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    
                    value='reg'
                    label='Is Registrar?'
                    name='radioGroup'
                    checked={valIsChecked === 'reg'}
                    onChange={onIsRadio_handleChange}
                  />  
                </Form.Field>
              </Form.Group>

          </React.Fragment>
      )
    }

    if(loader) {
      return(<Loader loadText='Loading'/>)
    }

    // DISPLAY FORM
    return (
      <Container textAlign="left" style={{marginTop:20}}  >
        <Segment  style={{ maxWidth: 600 ,margin:"auto"}}> 
      
          <Header textAlign="center"  color='blue' icon>
            Add Department
          </Header>

          <Form>

            <Form.Field >
              <Label as='a' color='blue'  ribbon>Department Name</Label>
              <input  required maxLength="40" name="department" value={valDeptName} onChange={(e)=>{setValDeptName(e.target.value)}}/>
            </Form.Field>

            <Form.Field >
              <Label as='a' color='blue'  ribbon>Type</Label>
                  <Dropdown
                  placeholder='Daparment Type'
                  fluid
                  search
                  selection
                  onChange={type_handleChange}
                  options={type}
                  />
            </Form.Field>

            {/* SET TRADITION IF NONE , REGISTRAR, FINANCE */}

            {valType === 2 ?  <TradionSubDept/> : ''}

            <Form.Field >
              <Label as='a' color='blue'  ribbon>Acadamic Level</Label>
                  <Dropdown
                  placeholder='Acadamic Level'
                  fluid
                  onChange={acadlevel_handleChange}
                  search
                  selection
                  value={valAcadLevel}
                  options={acadlevel}
                  />
            </Form.Field>

            <Form.Field >
              <Label as='a' color='blue'  ribbon>Department</Label>
                  <Dropdown
                    placeholder='Department'
                    fluid
                    search
                    selection
                    value={valCrsDept}
                    onChange={crsDept_handleChange}
                    options={crsDept}
                  />
            </Form.Field>

            <Form.Field >
              <Label as='a' color='blue'  ribbon>Course</Label>
                  <Dropdown
                    placeholder='Course'
                    fluid
                    search
                    value={valCourse}
                    selection
                    onChange={course_handleChange}
                    options={course}
                  />
            </Form.Field>

            <Form.Field >
              <Label as='a' color='blue'  ribbon>Yearlevel</Label>
                  <Dropdown
                    placeholder='Year Level'
                    fluid
                    search
                    selection
                    value={valYearLevel}
                    onChange={yearlevel_handleChange}
                    options={yearlevel}
                  />
            </Form.Field>

            <Form.Field >
              <Label as='a' color='blue' ribbon>Head Officer</Label>
              <input  required maxLength="40" name="Officer name" value={valHeadOff} onChange={(e)=>{setValHeadOff(e.target.value)}}/>
            </Form.Field>
            

            <Divider/>

            <Button onClick={onSubmit} >Submit</Button>
          </Form>
        </Segment>

      </Container>
    )
}

export default withRouter(FormExampleSubcomponentControl);