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

const SubscriptionData = () => {

    const [userList, setUserList] = useState([]);
  
    const columns = [
          { field: "_id", headerName: "ID", width: 150 },
          { field: "startDate", headerName: "Start Date", width: 200 },
          { field: "endDate", headerName: "End Date", width: 200 },
          // { field: "", headerName: "Username", width: 150 },
          // { field: "", headerName: "Plan", width: 200 },
        

          {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const api = params.api;
                const thisRow = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
        
                  console.log(thisRow._id);

                // return alert(JSON.stringify(thisRow, null, 4));
                return <Button onClick={deleteUser(thisRow._id)}>Delete</Button>;
              };
        
              return 
            }
          },
       ];

    const getBlogFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/Subscription/getall');

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

      
      const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/Subscription/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getBlogFromBackend();
            toast.success('User Deleted Successfully!!');
        }
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

export default SubscriptionData;