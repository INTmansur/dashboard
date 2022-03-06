
import {useState, useEffect} from "react";
import axios from "axios";


const User = () => {


    const initState = {
        name : "",
        email : "",
        dateOfBirth : "",
        sex : "",
        bloodGroup : "",
        contactNumber : "",
        emergencyContactNumber : "",
        presentAddress : "",
        hobbies : "",
        panNumber : "",
        adharNumber : "",
        motherTongue : "",
        fatherName : "",
        motherName : ""
    }

    const [createUser, setCreateUser] = useState(initState);
    const [allUser, setAllUser] = useState([]);
    const [oneUser, setOneUser] = useState({})
   

    const handleChangeUser =  (e) => {
        const {name, value} = e.target;

        setCreateUser({...createUser, [name] : value})
    }


    const handleCreateUserBtn = async () => {
        await axios.post("http://localhost:2233/user/create/user", createUser);
     const {data} = await axios.get("http://localhost:2233/user/all/user");
    setAllUser(data);
    }

    // console.log(allUser);

    const getAllUser = async () => {
        const {data} = await axios.get("http://localhost:2233/user/all/user");
         setAllUser(data);
    }

 


    const handleUpdateUserOne = async (id) => {
        const {data} = await axios.get(`http://localhost:2233/user/one/user/${id}`)
         setOneUser(data);
    }

    const handleUpdateUserOneChange = (e) => {
        const {name, value} = e.target;
        setOneUser({...oneUser, [name] : value});
    }

    const handleUserUpdateOne = async (id) => {
        await axios.patch(`http://localhost:2233/user/oneUpdate/user/${id}`, oneUser);
         getAllUser();

        const {data} = await axios.get("http://localhost:2233/user/all/user");
        setAllUser(data);
    }

   

    const handleDeleteUser = async (id) => {
        var z = window.confirm("Are you sure? ")

        if(z === true) {
            await axios.delete(`http://localhost:2233/user/ondelete/user/${id}`);
            
        } else {
            const {data} = await axios.get("http://localhost:2233/user/all/user");
            setAllUser(data);
        }
        
    }

    useEffect(() => {
        getAllUser();
    }, [allUser])

    return (
        <div className = "container-fluid">
            <div className = "row">
                <div className="row">
                    <div className="col-11"></div>
                    <div className="col-1">
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                         Create User
                    </button>
                        
                    </div>
                </div>
            </div>
            {/* <!-- Button trigger modal --> */}


                {/* <!-- Create User Modal --> */}
                <div className=" mt-5 t-5 modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">




                            {/* modal body */}
                             <form onSubmit = {(e) => e.preventDefault()} className="row g-3 needs-validation" novalidate>
                                <div className="col-md-11">
                                    <label for="validationCustom01" className="form-label">Name</label>
                                    <input onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type="text" name = "name" className="form-control" id="validationCustom01" value={createUser.name} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Email </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type = "email" name = "email" className="form-control" id="validationCustom02" value={createUser.email} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Date of Birth </label>
                                    <input  type = "date"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "dateOfBirth" className="form-control" id="validationCustom02" value={createUser.dateOfBirth} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Sex </label>
                                    <select name = "sex" onChange = {(e) => handleChangeUser(e)} className = "form-control">
                                        <option value = "Male">Male</option>
                                        <option value = "Female">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Blood Group </label>
                                    <input type = "text"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "bloodGroup" className="form-control" id="validationCustom02" value={createUser.bloodGroup} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label"> Contact Number </label>
                                    <input type = "number"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "contactNumber" className="form-control" id="validationCustom02" value={createUser.contactNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Emergency Contact Number </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type = "number" name = "emergencyContactNumber" className="form-control" id="validationCustom02" value={createUser.EmergencyContactNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Present Address </label>
                                    <input type = "text"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "presentAddress" className="form-control" id="validationCustom02" value={createUser.presentAddress} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Hobbies </label>
                                    <textarea  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "hobbies" className="form-control" id="validationCustom02" value={createUser.hobbies} ></textarea>
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Pan number </label>
                                    <input type = "text"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "panNumber" className="form-control" id="validationCustom02" value={createUser.panNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Adhar Number </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }}  type = "number" name = "adharNumber" className="form-control" id="validationCustom02" value={createUser.adharNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Mother Tongue </label>
                                    <input type = "text"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "motherTongue" className="form-control" id="validationCustom02" value={createUser.motherTongue} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Marital Status </label>
                                    <select name = "maritialStatus" onChange = {(e) => handleChangeUser(e)} className = "form-control">
                                        <option value = "Married">Married</option>
                                        <option value = "Unmarried">Unmarried</option>
                                    </select>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Father name </label>
                                    <input type = "text"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "fatherName" className="form-control" id="validationCustom02" value={createUser.fatherName} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Mother name </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type = "text" name = "motherName" className="form-control" id="validationCustom02" value={createUser.motherName} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick = {handleCreateUserBtn} type="button" className="btn btn-primary">Create</button>
                        </div>
                        </div>
                    </div>
                </div>


                {/* Show All the Use to here to the dashboard. */}
                
            {/* <hr /> */}
            <div className = "row">
            <table className="table">
                <thead>
                    <tr>
                    
                    <th scope="col">User name</th>
                    <th scope="col">User email</th>
                    <th scope = "col">User contact Number</th>
                    <th scope = "col">User Address</th>
                    <th scope="col">Action</th>
                    <th scope = "col">Show Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUser.map((e) => (

                         <>  

                            



                            <tr key = {e._id}>
                                
                                
                            <th scope="row">{e.name}</th>
                            <th>{e.email}</th>
                            <th>{e.contactNumber}</th>
                            <td>{e.presentAddress}</td>
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
                            <h5 className="modal-title" id="exampleModalLabel">Update Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">




                            {/* modal body */}
                             <form onSubmit = {(a) => a.preventDefault()} className="row g-3 needs-validation" novalidate>
                                {/* <div className="col-md-11">
                                    <label for="validationCustom01" className="form-label">Title</label>
                                    <input onChange = {(b) => {
                                        handleUpdateUserOneChange(b)
                                    }} type="text" name = "title" className="form-control" id="validationCustom01" value={oneUser.title} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div> */}
                                <div className="col-md-11">
                                    <label for="validationCustom01" className="form-label">Name</label>
                                    <input onChange = {(b) => {
                                        handleUpdateUserOneChange(b)
                                    }} type="text" name = "name" className="form-control" id="validationCustom01" value={oneUser.name} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Email </label>
                                    <input  onChange = {(b) => {
                                        handleUpdateUserOneChange(b)
                                    }} type = "email" name = "email" className="form-control" id="validationCustom02" value={oneUser.email} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom03" className="form-label">Date of Birth </label>
                                    <input  type = "date"  onChange = {(b) => {
                                        handleUpdateUserOneChange(b)
                                    }} name = "dateOfBirth" className="form-control" id="validationCustom03" value={oneUser.dateOfBirth} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom04" className="form-label">Sex </label>
                                    <select id = "validationCustom04" name = "sex" onChange = {(b) => handleUpdateUserOneChange(b)} className = "form-control" value = {oneUser.sex}>
                                        <option value = "Male">Male</option>
                                        <option value = "Female">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom05" className="form-label">Blood Group </label>
                                    <input type = "text"  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "bloodGroup" className="form-control" id="validationCustom05" value={oneUser.bloodGroup} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom06" className="form-label"> Contact Number </label>
                                    <input type = "number"  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "contactNumber" className="form-control" id="validationCustom06" value={oneUser.contactNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                
                                <div className="col-md-11">
                                    <label for="validationCustom07" className="form-label">Emergency Contact Number </label>
                                    <input  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} type = "number" name = "emergencyContactNumber" className="form-control" id="validationCustom02" value={oneUser.EmergencyContactNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom08" className="form-label">Present Address </label>
                                    <input type = "text"  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "presentAddress" className="form-control" id="validationCustom08" value={oneUser.presentAddress} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom09" className="form-label">Hobbies </label>
                                    <textarea  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "hobbies" className="form-control" id="validationCustom09" value={oneUser.hobbies} ></textarea>
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom10" className="form-label">Pan number </label>
                                    <input type = "text"  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "panNumber" className="form-control" id="validationCustom10" value={oneUser.panNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom11" className="form-label">Adhar Number </label>
                                    <input  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }}  type = "number" name = "adharNumber" className="form-control" id="validationCustom11" value={oneUser.adharNumber} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom12" className="form-label">Mother Tongue </label>
                                    <input type = "text"  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "motherTongue" className="form-control" id="validationCustom12" value={oneUser.motherTongue} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom13" className="form-label">Marital Status </label>
                                    <select id = "validationCustom13" name = "maritialStatus" onChange = {(d) => handleUpdateUserOneChange(d)} value = {oneUser.maritialStatus} className = "form-control">
                                        <option value = "Married">Married</option>
                                        <option value = "Unmarried">Unmarried</option>
                                    </select>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom14" className="form-label">Father name </label>
                                    <input type = "text"  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} name = "fatherName" className="form-control" id="validationCustom14" value={oneUser.fatherName} />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom15" className="form-label">Mother name </label>
                                    <input  onChange = {(d) => {
                                        handleUpdateUserOneChange(d)
                                    }} type = "text" name = "motherName" className="form-control" id="validationCustom15" value={oneUser.motherName} />
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





                            <span> {"    "}</span>  
                            <i onClick = {() => handleDeleteUser(e._id)} className='fas fa-trash-alt'></i>
                            {/* <FontAwesomeIcon icon="fa-duotone fa-eye" /> */}
                            </td>
                            <td>
                            <button onClick = {() => handleUpdateUserOne(e._id)}  className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${e._id}`} aria-expanded="false" aria-controls="collapseExample">
                               User All Details
                            </button>
                            
                            </td>
                            
                            </tr> 
                            <tr>
                                <td colSpan= "6">
                                <div className="collapse" id={`collapseExample${e._id}`}>
                                    <div className="card card-body">
                                       


                                        {/* Task table Shwo here */}
                                        <div className = "container-fluid">
                                            <div className = "row">
                                                
                                                <table className = "table">
                                                    <thead>
                                                        <tr>
                                                            <th>{" "}</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                       
                                                                <tr>
                                                                    <th>Name </th>
                                                                    <td>{oneUser.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Email </th>
                                                                    <td>{oneUser.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Date of Birth </th>
                                                                    <td>{oneUser.dateOfBirth}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Sex </th>
                                                                    <td>{oneUser.sex}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Blood Group </th>
                                                                    <td>{oneUser.bloodGroup}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Contact Number </th>
                                                                    <td>{oneUser.contactNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Emergency Contact Number </th>
                                                                    <td>{oneUser.emergencyContactNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Present Address </th>
                                                                    <td>{oneUser.presentAddress}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Hobbies </th>
                                                                    <td>{oneUser.hobbies}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Pan Number </th>
                                                                    <td>{oneUser.panNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Adhar Number </th>
                                                                    <td>{oneUser.adharNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Mother Tongue </th>
                                                                    <td>{oneUser.motherTongue}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Father Name </th>
                                                                    <td>{oneUser.fatherName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Mother Name </th>
                                                                    <td>{oneUser.motherName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Role </th>
                                                                    <td>{oneUser.role}</td>
                                                                </tr>
                                                          
                                                       
                                                    </tbody>
                                                </table>









                                            </div>
                                            

                                        </div>




                                    </div>
                                    </div>
                                </td>
                            
                            </tr>
                           
                            </>
                            
                        ))
                    }
                    
                   
                </tbody>
                </table>
            </div>






        </div>
    )
}

export {User};