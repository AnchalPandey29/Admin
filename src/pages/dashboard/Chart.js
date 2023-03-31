import React from 'react';

function MongoCharts() {
  return (
    <div className='row mt-5 ms-5 p-5'
     style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"fit-content",
        margin:"27px"
    }}>
    <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        marginRight:"30px"
      }}
      width="400"
      height="400"
      title='User Details'
      src="https://charts.mongodb.com/charts-project-0-tbeyn/embed/charts?id=642317a6-f6b1-4c69-8dd7-75e315350af5&maxDataAge=60&theme=light&autoRefresh=true"
    />

<iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="400"
      height="400"
      title='Subsription Details'
      src="https://charts.mongodb.com/charts-project-0-tbeyn/embed/charts?id=64232abd-2537-43ae-8d75-5ec4f37b673f&maxDataAge=3600&theme=light&autoRefresh=true"
      />



</div>
  );
}

export default MongoCharts;
