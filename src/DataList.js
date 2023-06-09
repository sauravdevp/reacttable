import React, {useState, useEffect} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { CSVExport, Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faEye} from "@fortawesome/free-solid-svg-icons";
// also install npm install @fontawesome/fontawesome-svg-core
function DataList(){
    const [userList,setUserList] = useState([]);
    const { SearchBar } = Search
    const { ExportCSVButton } = CSVExport;
    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        };
        return (
            <div>
                <button className="btn btn-success" onClick={handleClick}>Export To CSV</button>
            </div>
        )
    };
    const columns=[
        {dataField:'id',text:'Id',formatter: (cell, row, rowIndex, formatExtraData) => {
            return rowIndex + 1;
          },},
        {dataField:'name',text:'Name', sort: true, filter: textFilter()},
        {dataField:'username',text:'Username', sort: true},
        {dataField:'email',text:'Email', sort: true},
        {
            dataField: 'link',
            text: 'Action',
            formatter: (rowContent,row) => {
                return (
                    <div>
                        <CLink color="dark" href={`/#/masterkey/edit-tagapply/${ row.id }`} className="mr-2 mb-2" title="Edit" style={{ border: 'none', marginRight: '10px'}}>
                            <FontAwesomeIcon icon={faEdit} color="darkblue" />
                            
                        </CLink>
                        <button color="dark" className="mr-2 mb-2" title="Delete" style={{ border: 'none', marginRight: '10px'}} onClick={() => deleteOperation(row.id)}>
                            <FontAwesomeIcon color="red" icon={faTrash} />
                            
                        </button>
                    </div>
                )
            }
        },
    ]

    const pagination = paginationFactory({
        page:1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage){
            console.log('page',page);
            console.log('sizeperpage',sizePerPage);
        },
        onSizePerPageChange: function(page, sizePerPage){
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        }
    });


    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(result => setUserList(result))
        .catch(error => console.log(error));
    },[]);
    return <div>
        <ToolkitProvider
            bootstrap4
            keyField='id'
            data={userList}
            columns={columns}
            exportCSV
        >
            {
                props => (
                    <React.Fragment>
                        <MyExportCSV {...props.csvProps} />
                        <SearchBar {...props.searchProps} className="float-right" placeholder="search.." />
                        <BootstrapTable pagination=
                        
                        {pagination } 
        // bootstrap4
        //  keyField="id" 
        //  columns={columns}
        //   data={userList} 
        filter={filterFactory()} 
        {...props.baseProps}
        />
                    </React.Fragment>
                )
            }

        </ToolkitProvider>
        
        {/* <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
            {
                userList && userList.length> 0 ?
                userList.map(usr =>
                <tr>
                    <td>{ usr.id }</td>
                    <td>{ usr.name }</td>
                    <td>{ usr.username }</td>
                    <td>{ usr.email }</td>

                </tr>
                )
                :'Loading'
            }
        </table> */}
    </div>
}
export default DataList