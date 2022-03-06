
import {useState, useEffect} from "react";

import axios from "axios";

const Role = () => {
const [AllUser, setAllUser] = useState([]);


const handleGetAllUser = async () => {
    const {data} = await axios.get("http://localhost:2233/user/all/user");
    setAllUser(data);
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
    const {data} = await axios.get("http://localhost:2233/user/all/user");
    setAllUser(data);
}

const handleDeleteUser = async (id) => {

}

useEffect(() => {
    handleGetAllUser();
}, [AllUser])

    return (
        <div className = "container-fluid">
            <div className = "row">
                <div className="row">
                <div className="col-3">
                    <h2>
                        User Role management
                    </h2>
                        <hr/>
                    </div>
                    <div className="col-8"></div>
                   
                </div>
            </div>
        
        <div>
             <div>
                <table className = "table">
                    <thead>
                        <tr>
                            <th>User Name </th>
                            <th>User email</th>
                            <th>User Role</th>
                            
                            
                            <th>Change user Role</th>
                        </tr>
                    </thead>
                
                    <tbody>
                            {
                                AllUser.map((e) => (
                                    <tr key = {e._id}>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.role}</td>
                                     
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
                                                
                                                    <div className="col-md-11">
                                                        <label for="validationCustom01" className="form-label">User Role</label>
                                                        <input onChange = {(b) => {
                                                            handleUpdateUserOneChange(b)
                                                        }} type="text" name = "role" placeholder = "Enter the role" className="form-control" id="validationCustom01" value={oneUser.role} required />
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
    </div>
    )
}


export {Role};