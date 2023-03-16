import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const CustomToolbar =  () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const BlogDataGrid = () => {

    const [userList, setUserList] = useState([]);
  
    const columns = [
          { field: "_id", headerName: "ID", width: 150 },
          { field: "startdate", headerName: "Start Date", width: 150 },
          { field: "lastdate", headerName: "Last Date", width: 200 },
          { field: "title", headerName: "Title", width: 200 },
          { field: "image", headerName: "Image", width: 200 },
        
       ];

    const getBlogFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/campaign/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result);
        setUserList(data.result);

    };
    useEffect(() => {
        getBlogFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        // {...userList}
        rows={userList.slice()}
        columns = {columns}
        pagination
        getRowId={obj => obj._id}
        slots={{
          toolbar: CustomToolbar,
        }}
        checkboxSelection
        onRowSelected={handleRowSelection}
        
        />
        </div>
  )
}

export default BlogDataGrid