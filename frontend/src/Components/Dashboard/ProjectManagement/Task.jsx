
import {useState, useEffect} from "react";
import axios from "axios";



const Task = ({SetAllTask, AllTask, projectID, handleShowAllTask}) => {

// console.log(AllTask, projectID);

const initOneTask = {
    name : "",
    description : "",
    time : "",
    status : ""
}


const [oneTask, setOneTask] = useState(initOneTask)
const handleUpdateTaskOne = async (id) => {

    const {data} = await axios.get(`http://localhost:2233/task/all/task/one/${id}`);
    setOneTask(data);
}

const handleUpdateTaskOneChange = (e) => {
    const {name , value} = e.target;
    setOneTask({...oneTask, [name] : value})
}


const handleTaskUpdateOne = async (id) => {
    if(oneTask.name !== "" || oneTask.description !== "") {
        await axios.patch(`http://localhost:2233/task/all/task/updateOne/${id}`, oneTask)

        const {data} = await axios.get(`http://localhost:2233/task/all/task/all/${projectID}`);
        SetAllTask(data);
    }
    
}


const handleDeleteTask = async (id) => {
    const z = window.confirm("Are you sure? ");
    if(z === true) {

        // delete from task model
        const {data} = await axios.delete(`http://localhost:2233/task/all/task/deleteOne/${id}`);

        const task = {
            taskId : id
        }



        await axios.post(`http://localhost:2233/project/oneUpda/${projectID}/${id}`, task);

        data.assign_to.map(async (e) => {
            await axios.post(`http://localhost:2233/user/oneUpda/user/${e}`, task)
        })


        const {dataa} = await axios.get(`http://localhost:2233/task/all/task/all/${projectID}`);
        SetAllTask(dataa);
        // console.log(dataa);


    } else {
        const {data} = await axios.get(`http://localhost:2233/task/all/task/all/${projectID}`);
        SetAllTask(data);
    }
}
    


useEffect(async() => {
    const {data} = await axios.get(`http://localhost:2233/task/all/task/all/${projectID}`);
     SetAllTask(data);
     handleShowAllTask(projectID)
}, [AllTask])
    return (
        <div>
            <table className = "table">
                <thead>
                    <tr>
                        <th>Task title</th>
                        <th>Task description</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
               
               <tbody>
                    {
                        AllTask.map((e) => (
                            <tr key = {e._id}>
                                <td>{e.name}</td>
                                <td>{e.description}</td>
                                <td>
                                    {
                                    e.assign_to.join(",  ")
                                    }
                                </td>
                                <td>{e.status}</td>
                                <td>
                         
                         <i data-bs-toggle="modal" data-bs-target="#updateModala" onClick = {() => {
                            //  open();
                             handleUpdateTaskOne(e._id);
                         }} className='fas fa-edit'></i>

                         {/* 
                 Modal for update page */}



                            <div className=" mt-5 t-5 modal fade" id="updateModala" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Update Task</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">




                                        {/* modal body */}
                                        <form onSubmit = {(a) => a.preventDefault()} className="row g-3 needs-validation" novalidate>
                                           
                                            <div className="col-md-11">
                                                <label for="validationCustom01" className="form-label">Name</label>
                                                <input onChange = {(b) => {
                                                    handleUpdateTaskOneChange(b)
                                                }} type="text" name = "name" className="form-control" id="validationCustom01" value={oneTask.name} required />
                                                <div className="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            <div className="col-md-11">
                                                <label for="validationCustom02" className="form-label">description </label>
                                                <textarea  onChange = {(b) => {
                                                    handleUpdateTaskOneChange(b)
                                                }} type = "email" name = "description" className="form-control" id="validationCustom02" value={oneTask.description} required></textarea>
                                                <div className="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            <div className="col-md-11">
                                                <label for="validationCustom03" className="form-label">time </label>
                                                <input  type = "date"  onChange = {(b) => {
                                                    handleUpdateTaskOneChange (b)
                                                }} name = "time" className="form-control" id="validationCustom03" value={oneTask.time} required />
                                                <div className="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-11">
                                                <label for="validationCustom05" className="form-label">Status </label>
                                                <input type = "text"  onChange = {(d) => {
                                                    handleUpdateTaskOneChange(d)
                                                }} name = "status" className="form-control" id="validationCustom05" value={oneTask.status} />
                                                <div className="valid-feedback">
                                                Looks good!
                                                </div>
                                            </div>
                                            
                                            <button onClick = {() => handleTaskUpdateOne(e._id)} type="button" className="btn btn-primary">Update</button>
                                            
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                       
                                    </div>
                                    </div>
                                </div>
                            </div>





                         <span> {"    "}</span>  
                         <i onClick = {() => handleDeleteTask(e._id)} className='fas fa-trash-alt'></i>
                         {/* <FontAwesomeIcon icon="fa-duotone fa-eye" /> */}
                         </td>
                            </tr>
                        ))
                    }
               </tbody>
                
            </table>
        </div>
    )
}



export {Task};