import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import PageHeader from "../PageHeader";
import makeData from "./makeData";
import { Button } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'
import { useEffect, useState } from "react";

export const TableBS = ({data,columns}) => {
    if(!data.length) data = []
    if(!columns.length) columns = []

    // const [hover,SetHover] = useState(null)
    
    // useEffect(() => {
    //     let headers={

    //     }
    //     axios.get(`${process.env.REACT_APP_DOMAIN}/dogs`,{headers:headers})
    //     .then(response => {
    //         console.log(response);
    //         setDogsData(response.data)
    //     })
  
        
    //   }, []);

      const rowEvents = {
        // onMouseEnter: (e, row, rowIndex) => {
        // //   this.setState({ hoverIdx: rowIndex });
        //   SetHover({ hoverIdx: rowIndex })
        // },
        // onMouseLeave: () => {
        //     SetHover({ hoverIdx: null })
        // }
        // ,onClick:()=>{
        //     console.log("click");
        // }
      }

    //   const columns = [
    //     {
    //     text: '#',
    //     sort: true,
    //     formatter: (column, colIndex,rowIndex) => {
    //         return rowIndex+1
    //     }
    //     }, 
    //     {
    //     dataField: 'name',
    //     text: 'שם',
    //     sort: true
    //     }, 
    //     {
    //     dataField: 'birth',
    //     text: 'גיל'
    //     },
    //   {
    //     dataField: 'gender',
    //     text: 'מגדר',
    //     formatter: cell => selectOptions[cell]
    //   },
    //   {
    //     dataField: 'allergy',
    //     text: 'אלרגיות',
    //     formatter: cell => cell ===  "1" ? "כן":"לא"
    //   },
    //   {
        
    //     text: 'פעולות',
    //     isDummyField: true,
    //     formatExtraData: { hoverIdx: hover },
    //     formatter: (column, colIndex,rowIndex,{hoverIdx}) => {
    //         // console.log("column",column);
    //         // console.log("index",colIndex);
    //         // console.log("rowIndex",rowIndex);
    //         // console.log("rowIndex",hoverIdx);
    //         return (
    //                 <>
    //             <Button onClick={handleButtonClick}  data-id={colIndex._id} variant="orange" className="rounded-bottom"><Icon.Pencil/></Button>
    //             <Button onClick={handleButtonClick}  data-id={colIndex._id} variant="danger" className="rounded-bottom"><Icon.Trash/></Button>
    //             </>
    //             )
    //     }
    //   },
    // ];
    // const handleButtonClick = (event) => {
    //     const dataId = event.target.getAttribute('data-id');
    //     // Use the clickedDataId in your application logic
    //     console.log(`Button with data-id ${dataId} clicked`);
    // };
      
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div className="container">
          <div>
            <div>
              <BootstrapTable
                responsive
                striped
                hover
                keyField="_id"
                noDataIndication="לא נמצאו נתונים"
                data={ data }
                columns={ columns }
                filter={ filterFactory() }
                rowEvents={ rowEvents }
                { ...paginationTableProps }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
          <PaginationListStandalone { ...paginationProps } />
          <PaginationTotalStandalone { ...paginationProps } />
          </div>
          
        </div>
      );

const options = {
    custom: true,
    paginationSize: 3,
    pageStartIndex: 1,
    firstPageText: 'ראשון',
    prePageText: 'הקודם',
    nextPageText: 'הבא',
    lastPageText: 'אחרון',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: data.length,
    alwaysShowAllBtns:true
  };
  

  return (
    <div>
        <PaginationProvider pagination={paginationFactory(options)}>
            { contentTable }
        </PaginationProvider>
    </div >
  );
}