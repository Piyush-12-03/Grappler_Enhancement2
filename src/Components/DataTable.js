import React from 'react';

const DataTable = () => {
  const data = [
    { id: 1, description: "Sample project description", date1: "2023-10-31 23:59:59.000000", name: "Sample Project Name", date2: "2023-10-01 00:00:00.000000" },
    { id: 2, description: "sd,m", date1: "2023-10-26 05:42:00.000000", name: ",m,m", date2: "2023-10-23 07:08:01.125000" },
    { id: 3, description: "sd,m", date1: "2023-10-26 05:42:00.000000", name: ",m,m", date2: "2023-10-23 07:08:01.125000" },
  ];

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px',
    backgroundColor: '#f8f9fa',
  };

  const thStyle = {
    backgroundColor: '#343a40',
    color: '#fff',
    fontWeight: 'bold',
  };

  const trEvenStyle = {
    backgroundColor: '#e9ecef',
  };


  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle} scope="col">#</th>
          <th style={thStyle} scope="col">Sample project description</th>
          <th style={thStyle} scope="col">Date 1</th>
          <th style={thStyle} scope="col">Sample Project Name</th>
          <th style={thStyle} scope="col">Date 2</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} style={index % 2 === 0 ? trEvenStyle : {}}>
            <th scope="row">{item.id}</th>
            <td>{item.description}</td>
            <td>{item.date1}</td>
            <td>{item.name}</td>
            <td>{item.date2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;
