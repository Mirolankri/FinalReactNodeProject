import React, { useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
// import {Table as TableBootsrap} from 'react-bootstrap/Table';
// import makeData from "./makeData";
import PageHeader from "../PageHeader";
import useTableComponnent from "./useTableComponnent";
import { ButtonCURD } from "../../dogs/pages/DogsPage";
import axios from 'axios';
import { useUser } from "../../users/providers/UserProvider";
import { Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'
import { TableBS } from "./TableBS";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { calculateDogAge, getAgeFromBirth } from "../../Helpers/DateTime";
 import Swal from 'sweetalert2'
import useDogs from "../../dogs/hooks/useDogs";
import { useState } from "react";
import { GetMyDogs } from "../../dogs/service/ApiService";


const Table = () => {
  // axios.defaults.withCredentials = true;
  const {DogsData,setDogsData} = useUser()
  const {handleDelete} = useDogs()
  const navigate = useNavigate()


  useEffect(() => {

    GetMyDogs().then(response => {
          setDogsData(response)
      })

  }, []);

  const columns = [
    {
    dataField: '#',
    text: '#',
    // sort: true,
    isDummyField: true,
      formatter: (column, colIndex,rowIndex) => {
          return rowIndex+1
      }
    }, 
    {
      dataField: 'name',
      text: 'שם',
      sort: true
    }, 
    {
      dataField: 'birth',
      text: 'גיל',
      formatter: age=>{
        let DogAge = getAgeFromBirth(age);
        return (
          <div>
            {DogAge}
          <br></br>
          גיל בחיי אדם:
          {calculateDogAge(DogAge,'small')}
          </div>
          )
      }
    },
    {
      dataField: 'gender',
      text: 'מגדר',
        formatter: cell => {
          return cell === "female" ? "נקבה":"זכר"
        }
    },
    {
      dataField: 'allergy',
      text: 'אלרגיות',
      formatter: cell => cell ===  "1" ? "כן":"לא"
    },
    {
      dataField: 'פעולות',
      text: 'פעולות',
      isDummyField: true,
      formatExtraData: { hoverIdx: null },
      formatter: (column, colIndex,rowIndex,{hoverIdx}) => {
          // console.log("column",column);
          // console.log("index",colIndex);
          // console.log("rowIndex",rowIndex);
          // console.log("rowIndex",hoverIdx);
          return (
              <div className="d-flex justify-content-around">
                <Button onClick={FunctionObj.handleButtonClickEdit}  data-id={colIndex._id} variant="orange" className="rounded-bottom p-2"><Icon.Pencil/></Button>
                <Button onClick={FunctionObj.handleButtonClickDelete}  data-id={colIndex._id} variant="danger" className="rounded-bottom p-2"><Icon.Trash/></Button>
              </div>
              )
      }
    }
];

  const FunctionObj = {
    handleButtonClickEdit(e){
      const dataId = e.target.getAttribute('data-id');
      return navigate(`${ROUTES.DOG_UPDATE}/${dataId}`)
    },
    handleButtonClickDelete(e){
      const DogID = e.target.getAttribute('data-id');
      // Use the clickedDataId in your application logic
      Swal.fire({
        icon:"warning",
        title: 'האם להסיר את הכלב.ה?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'הסרה!',
        cancelButtonText:'ביטול',
        confirmButtonColor:'red'
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let DeleteDog = await handleDelete(DogID)
          console.log("DeleteDog",DeleteDog);
          if(DeleteDog){
            let FindDog = DogsData.findIndex(dog=>dog._id === DogID)
            if(FindDog !== -1){
                DogsData.splice(FindDog, 1);                
                setDogsData(DogsData)
              Swal.fire('הוסר', '', 'success').then(()=>{
                return navigate(`${ROUTES.DOG_LIST}`)
              })
            }
            // 
           
          }
        } 
      })

    }

  }
  return (
    <>
      <PageHeader _title={"הכלבים שלי"} RightComponentFill={<ButtonCURD/>}/>
      <TableBS data={DogsData} columns={columns}/>
    </>
  )
  }
export default Table;
