import React,{useState, useEffect} from 'react';
import { withRouter, useLocation, useRouteMatch, useHistory} from "react-router-dom";
import csv from 'csvtojson';
import { Button, Menu, Segment, Header, Form, Loader,Dimmer,Label, Input, Divider} from 'semantic-ui-react';
import axios from 'axios'
import baseURL from '../../../../../../res/baseuri';



const RegisterSubject = (props)  => {
    
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();

    const [loading, setLoading] = useState(true);
    const [submenu , setSubmenu] = useState('List');
    const [depDetails, setDepDetails] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [subjectDetails, setSubjectDetails] = useState([]);

    const [IsLoading,setIsLoading] = useState(false);

    const [CsvFile,setCsvFile] = useState();

    useEffect(()=>{

        console.log('Match: ', match)
        console.log('Location: ', location)
        console.log('History: ', history)

        let upadateHook = true;

        const x = async() => {
            try{

                const header = {
                    headers: {
                        authorization : localStorage.getItem('x')
                    }
                }

                // Get Department Details
                const result = await axios.post(`${baseURL}/api/department/getone`, { id:location.state.dept }, header);

                // Get SubjectDetails
                const fetchDeptDetails = await axios.get(`${baseURL}/api/subjclass/subjects/${result.data.sqlResult[0].el_id}`,header);

                console.log(result.data)
                console.log('Fetch Dept Details: ', fetchDeptDetails.data.data);

                if(upadateHook)
                {
                    setLoading(false);
                    setDepDetails(result.data.sqlResult[0]);
                    setSubjectDetails(fetchDeptDetails.data.data)
                }

            } catch(err) {
                history.push('/')
            }
        }

        x();

        return () => (upadateHook = false)
    },[history, location, match]);

    if(loading){
        console.log('Loading')
        return(
            <Loader/>
        )
    }

    const parseCSV = async(e) => {
      try{
        e.preventDefault()
        alert('CSV File Set')
        setCsvFile(e.target.files[0])
      } catch(err) {
        alert('Invalid CSV')
      }
    }
 
    const parse2 = async(file) => {
      try{
        setIsLoading(true);

        setCsvFile(file)

        var reader = new FileReader();
  
        function readCSVfile() {
          return(
            new Promise((res, rej)=>{
              
              reader.readAsText(file)
  
              reader.onload = function() {
                if(reader.result){
                  res(reader.result)
                } else {
                  rej('');
                }
              }
  
            })
          )
        }

        const refactorToMySQL = () => { 
          return(
            new Promise((res, rej) => {

              if(output){
                let data2= ( output.slice( 1, output.length).map((it, ix) => {
  
                    if(it.field1 !== "") {
                      return (
                                [
                                  it.field1, // studentUsername
                                  it.field2, // amount
                                  it.field3, // paymentDate
                                ]
                      )
                    }
                  })
                );
  
                res(data2)
              } else {
                rej([])
              }

            })
          )
        }

        let data = await readCSVfile()

        let output = await csv({noheader:true, output: "json " }).fromString(data);

        refactorToMySQL()
        .then(async(data)=>{
          const header = {
              headers: {
                  authorization : localStorage.getItem('x')
              }
          }

          const body = {
              values : data
          }

          // /api/finance/upload
          const result = await axios.post(`${baseURL}/api/finance/upload`,body,header);

          alert('Uploading .CSV successful..')
          setIsLoading(false);
          console.log('CSV to Mysql Uploaded')
          console.log(result.data.data);

        })
        .catch(()=>{
          console.log('Invalid CSV')
          alert('Uploading .CSV failed..')
          setIsLoading(false);
        })
      } catch(err) {
        console.log('Invalid CSV')
        alert('Uploading .CSV failed..')
        setIsLoading(false);
      }
    }

    return (

        <div>

            <div>
                <Header as='h2'>

                        {depDetails.d_name || ''}

                    <Header.Subheader>
                      Upload Payment history
                    </Header.Subheader>
                </Header>
            </div>

            <hr/>

            <Dimmer inverted active={IsLoading}>
            <Loader/>
          </Dimmer>

        <Segment  style={{ maxWidth: 600 ,margin:"auto"}}> 

          <Header textAlign="center"   icon>
            <h2>Upload CSV</h2>
          </Header>

          <Form>

         
            <Form.Field >
              <Label as='a' color='blue'  ribbon>Upload .csv file</Label>
              <Input onChange={(e)=> {parseCSV(e)}} required type="file"/>
            </Form.Field>

            <Divider/>

            <Button onClick={()=>{ parse2(CsvFile); }} color='blue'>Upload</Button>
          </Form>
        </Segment>


        </div>

    )
}

export default withRouter(RegisterSubject)
