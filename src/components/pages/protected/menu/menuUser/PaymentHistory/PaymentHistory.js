import React, {useState, useEffect} from 'react';
import { withRouter, useHistory} from "react-router-dom";
import {  Table } from 'semantic-ui-react';
import {PageHeader} from '../../../../../sturcture/atoms';
import {CustomTable} from '../../../../../sturcture/organism';
import axios from 'axios';
import baseURL from '../../../../../../res/baseuri';


const tableHeaders = [
    'ID',
    'Student Name',
    'Amount',
    'Is SMS sent?',
    'Course',
    'Yr. Level',
    'Contact #.'
]

const UploadPaymentHistory = () => {
    const [records, setRecords] = useState([]);

    const history = useHistory();

    const fetchData = async({updateState = false, setStateCallback = ()=>{} })=>{
        try{
            const header = {
                headers: {
                    authorization : localStorage.getItem('x')
                }
            }
            const callAPI = await axios.get(`${baseURL}/api/finance/payment-history` , header);
           
            if(updateState && callAPI.data && callAPI.data.data){
                setStateCallback(callAPI.data.data);
            }else {
                alert('Try reloading the page.')
            }

            
        } catch(err) {
            history.push('/')
        }
    };
    
    useEffect( () => {
       
        let updateState = true;

        const setStateCallback = (data) => {
            if(updateState){
                setRecords(data);
            }
        }   

        fetchData({updateState, setStateCallback})

        return () => updateState = false
        
      }, []);

    const RowInTable = ({itemData: {
        studfname ,
        studmname ,
        course ,
        yearlevel ,
        cpnum ,
        studentUsername ,
        amount ,
        is_sms 
     }}) => (
        <Table.Row >
            <Table.Cell>{studentUsername}</Table.Cell>
            <Table.Cell>{studfname}, {studfname} {studmname}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>{is_sms ? 'YES':'NO'}</Table.Cell>
            <Table.Cell>{course}</Table.Cell>
            <Table.Cell>{yearlevel}</Table.Cell>
            <Table.Cell>{cpnum}</Table.Cell>
        </Table.Row>
    );

        return(
            <div>
                <PageHeader title={'Student Payment History'} subtitle='View uploaded records of payment.'/>
                <CustomTable tableColumnNames={tableHeaders} data={records} renderItem={RowInTable} keyExtractor='payment_id'/>
            </div>
        )
}

export default withRouter(UploadPaymentHistory);