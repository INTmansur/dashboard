
import {useState, useEffect} from "react";
import Pagination from '@mui/material/Pagination';

import axios from "axios";


const Permission = () => {

    ///pagination code here
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const [AllUser, setAllUser] = useState([]);


const handleGetAllUser = async () => {
    const {data} = await axios.get(`http://localhost:2233/user/allUser/user?page=${page}&size=5`);
    setAllUser(data.user);
    setTotalPage(data.totalPage);
}


const initUser = {
    role : ""
}
const [oneUser, setOneUser] = useState({});

const handleUpdateUserOne = async (id) => {

    const {data} = await axios.get(`http://localhost:2233/user/one/user/${id}`);
    setOneUser(data);

}



const handleUpdateUserOneChange = (e) => {
    const {name , value} = e.target;
    setOneUser({...oneUser, [name] : value})
}


const handleUserUpdateOne = async (id) => {
    await axios.patch(`http://localhost:2233/user/oneUpdate/user/${id}`, oneUser);
    const {data} = await axios.get(`http://localhost:2233/user/allUser/user?page=${page}&size=5`);
    setAllUser(data.user);
    setTotalPage(data.totalPage);
}

const handleDeleteUser = async (id) => {

}

const [Name, setName] = useState("");

const handleNameSearch = async (name) => {

    if(name === "") {
        const {data} = await axios.get(`http://localhost:2233/user/allUser/user?page=${page}&size=5`);
    setAllUser(data.user);
    setTotalPage(data.totalPage);
    } else {
        const {data} = await axios.get(`http://localhost:2233/user/all/user/user/name/${name}`)
     setAllUser(data);
    }
    

}

const handlePageChange = (event, value) => {
    setPage(value);
}


useEffect(() => {
    handleGetAllUser();
}, [AllUser])
    return (
        <div className = "container-fluid">



            
            
            <div className = "row">
                <div className="row">
                    <div className="col-5">
                        <h2>
                            User Permission management
                        </h2>
                            <hr/>
                        </div>
                        <div className="col-5">
                        <label className = "form-label">Search by Name</label>
                            <input onChange = {(e) => {
                                setName(e.target.value);
                                handleNameSearch(e.target.value);
                            }} value = {Name} type = "text" name = "name" className = "form-control" placeholder = "enter the name" />
                    </div>
                   
                </div>
                
            </div>
        
        <div>
             <div>
                <table className = "table">
                    <thead>
                        <tr>
                            <th>User Name </th>
                            <th>User email</th>
                            <th>User Project permission</th>
                            <th>User Role permission</th>
                            <th>User Task permission</th>
                            <th>User permission</th>
                            
                            
                            <th>Change user Role</th>
                        </tr>
                    </thead>
                
                    <tbody>
                            {
                                AllUser.map((e) => (
                                    <tr key = {e._id}>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>
                                            <tr>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                            <tr>
                                                <td>{e.project_create}</td>
                                                <td>{e.project_update}</td>
                                                <td>{e.project_delete}</td>
                                            </tr>
                                        </td>
                                       
                                        <td>
                                            <tr>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                            <tr>
                                                <td>{e.task_create}</td>
                                                <td>{e.task_update}</td>
                                                <td>{e.task_delete}</td>
                                            </tr>
                                        </td>
                                        <td>
                                            <tr>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                            <tr>
                                                <td>{e.user_create}</td>
                                                <td>{e.user_update}</td>
                                                <td>{e.user_delete}</td>
                                            </tr>
                                        </td>
                                        <td>
                                            <tr>
                                                
                                                <th>Update</th>
                                                
                                            </tr>
                                            <tr>
                                                <td>{e.role_update}</td>
                                                
                                            </tr>
                                        </td>
                                     
                                        <td>
                                
                                <i data-bs-toggle="modal" data-bs-target="#updateModal" onClick = {() => {
                                    handleUpdateUserOne(e._id);
                                }} className='fas fa-edit'></i>

                                {/* 
                        Modal for update page */}



                                    <div className=" mt-5 t-5 modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Update Role</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">




                                                {/* modal body */}
                                                <form onSubmit = {(a) => a.preventDefault()} className="row g-3 needs-validation" novalidate>
                                                    <h2>Project permission</h2>
                                                    <hr />
                                                    <div className="col-md-11">
                                                        <label for="validationCustom01" className="form-label">Project create permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "project_create" className="form-control" id="validationCustom01" value={oneUser.project_create} required >
                                                            <option selected disabled>Please select option</option>
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <label for="validationCustom011" className="form-label">Project update permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "project_update" className="form-control" id="validationCustom011" value={oneUser.project_update} required >
                                                            <option selected disabled>Please select option</option>
                                                            
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <label for="validationCustom012" className="form-label">Project delete permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "project_delete" className="form-control" id="validationCustom012" value={oneUser.project_delete} required >
                                                            <option selected disabled>Please select option</option>
                                                            
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <h2>Task permission</h2>
                                                   <hr />

                                                   <div className="col-md-11">
                                                        <label for="validationCustom013" className="form-label">Task create permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "task_create" className="form-control" id="validationCustom013" value={oneUser.task_create} required >
                                                            <option selected disabled>Please select option</option>
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <label for="validationCustom014" className="form-label">Task update permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "task_update" className="form-control" id="validationCustom014" value={oneUser.task_update} required >
                                                            <option selected disabled>Please select option</option>
                                                            
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <label for="validationCustom015" className="form-label">Task delete permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "task_delete" className="form-control" id="validationCustom015" value={oneUser.task_delete} required >
                                                            <option selected disabled>Please select option</option>
                                                            
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <h2>User Permission</h2>
                                                    <hr />
                                                    <div className="col-md-11">
                                                        <label for="validationCustom1" className="form-label">User create permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "user_create" className="form-control" id="validationCustom1" value={oneUser.user_create} required >
                                                            <option selected disabled>Please select option</option>
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <label for="validationCustom11" className="form-label">User update permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "user_update" className="form-control" id="validationCustom11" value={oneUser.user_update} required >
                                                            <option selected disabled>Please select option</option>
                                                            
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    <div className="col-md-11">
                                                        <label for="validationCustom12" className="form-label">User delete permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "user_delete" className="form-control" id="validationCustom12" value={oneUser.user_delete} required >
                                                            <option selected disabled>Please select option</option>
                                                            
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                <hr />
                                                <h2>User Role permission</h2>
                                                <hr />
                                                <div className="col-md-11">
                                                        <label for="validationCustom0122" className="form-label">Role Update permission</label>
                                                        <select onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }}  name = "role_update" className="form-control" id="validationCustom0122" value={oneUser.role_update} required >
                                                            <option selected disabled>Please select option</option>
                                                            <option value = "YES">YES</option>
                                                            <option value = "NO">NO</option>
                                                        </select>
                                                       
                                                        <div className="valid-feedback">
                                                        Looks good!
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button onClick = {() => handleUserUpdateOne(e._id)} type="button" className="btn btn-primary">Update</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                     </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                    
                </table>
            </div>
        </div>
        <div className = "row">
                <div className = "col-8"></div>
                <div className = "col-4">
                    <nav aria-label="...">
                        <ul className="pagination">
                            
                            <Pagination page = {page} onChange = {handlePageChange} count={totalPage} variant="outlined" />
                            
                            
                        </ul>
                    </nav>
                </div>
            </div>
        
    </div>
    )
}


export {Permission};