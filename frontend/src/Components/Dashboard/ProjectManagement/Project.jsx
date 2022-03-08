import {useState, useEffect} from "react";
import axios from "axios";

import "./Project.css";


//fontAwsome icon

import {Task} from "./Task";

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }





const Project = () => {

    const initProjectState = {
        title : "",
        description: "",
        task : []
    }

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
        console.log(value);
    }

    const [createProject, setCreateProject] = useState(initProjectState)
    const handleChangeProject = (e) => {
        const {name, value} = e.target;
        console.log(name);
        setCreateProject({...createProject, [name] : value})
    }


const [allProject, setAllProject] = useState([])
const [allUser, setAllUser] = useState([])
const [names, setNames] = useState([])



const getAllUser = async () => {
    const {data} = await axios.get("http://localhost:2233/user/all/user");
    setAllUser(data);

     
    //  console.log(names);
}

const handleCreateProjectBtn = async() => {
    // console.log(createProject)
     await axios.post("http://localhost:2233/project/create", createProject);
     const {data} = await axios.get(`http://localhost:2233/project/all?page=${page}&size=5`);

    setAllProject(data.project);
    setTotalPages(data.totalPage)
}



const getAllProject = async () => {
    const {data} = await axios.get(`http://localhost:2233/project/all?page=${page}&size=5`);

    setAllProject(data.project);
    setTotalPages(data.totalPage)
}



// show one data to the modal box

const [oneProject, setOneProject] = useState({});
const handleUpdateProjectOne = async (id) => {
    const {data} = await axios.get(`http://localhost:2233/project/one/${id}`)
    setOneProject(data);
}


const handleUpdateProjectOneChange = (e) => {
    const {name, value} = e.target;
    setOneProject({...oneProject, [name] :value})
}

const handleProjectUpdateOne = async (id) => {
    await axios.patch(`http://localhost:2233/project/oneUpdate/${id}`, oneProject);
    getAllProject();

    const {data} = await axios.get(`http://localhost:2233/project/all?page=${page}&size=5`);

    setAllProject(data.project);
    setTotalPages(data.totalPage)

}






///This portion for the task create update and delete  all the basic  thing Got it.



const [allTask, setAllTask] = useState([]);

const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const initTask = {
    name : "",
    description: "",
    time : "",
    assign_to : [],
    status : ""
}
const [createTask, setCreateTask] = useState(initTask)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setCreateTask({...createTask, ["assign_to"] : personName})
  };

// console.log(createTask);
  



const handleChangeTask = (e) => {
    const {name, value} = e.target;
    setCreateTask({...createTask, [name] : value})
    // setCreateTask({...createTask, ["assign_to"] : personName})

}

// console.log(createTask);

  const handleClickCreateTask = async () => {
        
      const d = allUser.map((e) => {
          return e.name;
      })
      setNames(d);
      
  }
//   console.log(personName);
// console.log(createTask);


const handleCreateTaskBtn = async (projectId) => {
    setCreateTask({...createTask, ["project_id"] : projectId})
    const {data} = await axios.post("http://localhost:2233/task/create/task/all", createTask);

    const Task_id = data._id;
    const task = {
        taskId : Task_id
    }

    await axios.post(`http://localhost:2233/project/oneUpd/${projectId}/${Task_id}`, task);

   

    personName.map(async (e) => {
        await axios.post(`http://localhost:2233/user/oneUpd/user/${e}`, task)
    })
}




const handleShowAllTask = async (projectId) => {
    const {data} = await axios.get(`http://localhost:2233/task/all/task/all/task/${projectId}`);
    setAllTask(data);
    
}




//handleDeleteoneProject;

const handleDeleteProject = async (id) => {
    var z = window.confirm("Are you sure? ")

    if(z === true) {
        await axios.delete(`http://localhost:2233/project/ondelete/${id}`);
        const {data} = await axios.get(`http://localhost:2233/project/all?page=${page}&size=5`);

        setAllProject(data.project);
        setTotalPages(data.totalPage)

    } else {
        const {data} = await axios.get(`http://localhost:2233/project/all?page=${page}&size=5`);

        setAllProject(data.project);
        setTotalPages(data.totalPage)

    }
    
}


    useEffect(() => {
        getAllProject();
        getAllUser();
        // handleShowAllTask();

    }, [page])


    return ( 
        <div className = "container-fluid">







            <div className = "row">
                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                         Create Project
                    </button>
                        
                    </div>
                </div>
            </div>
            {/* <!-- Button trigger modal --> */}


                {/* <!-- Modal --> */}
                <div className=" mt-5 t-5 modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">




                            {/* modal body */}
                             <form onSubmit = {(e) => e.preventDefault()} className="row g-3 needs-validation" novalidate>
                                <div className="col-md-11">
                                    <label for="validationCustom01" className="form-label">Title</label>
                                    <input onChange = {(e) => {
                                        handleChangeProject(e)
                                    }} type="text" name = "title" className="form-control" id="validationCustom01" value={createProject.title} required />
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Description </label>
                                    <textarea  onChange = {(e) => {
                                        handleChangeProject(e)
                                    }} name = "description" className="form-control" id="validationCustom02" value={createProject.description} required></textarea>
                                    <div className="valid-feedback">
                                    Looks good!
                                    </div>
                                </div>
                                
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick = {handleCreateProjectBtn} type="button" className="btn btn-primary">Create</button>
                        </div>
                        </div>
                    </div>
                </div>


                {/* Show All the project to the dashboard. */}
                
            {/* <hr /> */}
            <div className = "row">
            <table className="table">
                <thead>
                    <tr>
                    
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                    <th scope = "col">Task</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProject.map((e) => (

                         <>  

                            



                            <tr key = {e.title}>
                                
                                
                            <th scope="row">{e.title}</th>
                            <td>{e.description}</td>
                            <td>
                         
                            <i data-bs-toggle="modal" data-bs-target="#updateModal" onClick = {() => {
                                handleUpdateProjectOne(e._id);
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
                                                            <div className="col-md-11">
                                                                <label for="validationCustom01" className="form-label">Title</label>
                                                                <input onChange = {(b) => {
                                                                    handleUpdateProjectOneChange(b)
                                                                }} type="text" name = "title" className="form-control" id="validationCustom01" value={oneProject.title} required />
                                                                <div className="valid-feedback">
                                                                Looks good!
                                                                </div>
                                                            </div>
                                                            <div className="col-md-11">
                                                                <label for="validationCustom02" className="form-label">Description </label>
                                                                <textarea  onChange = {(b) => {
                                                                    handleUpdateProjectOneChange(b)
                                                                }} name = "description" className="form-control" id="validationCustom02" value={oneProject.description} required></textarea>
                                                                <div className="valid-feedback">
                                                                Looks good!
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button onClick = {() => handleProjectUpdateOne(e._id)} type="button" className="btn btn-primary">Update</button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>





                            <span> {"    "}</span>  
                            <i onClick = {() => handleDeleteProject(e._id)} className='fas fa-trash-alt'></i>
                            {/* <FontAwesomeIcon icon="fa-duotone fa-eye" /> */}
                            </td>
                            <td>
                            <button onClick = {() => handleShowAllTask(e._id)} className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${e._id}`} aria-expanded="false" aria-controls="collapseExample">
                               Show all  Task
                            </button>
                            
                            </td>
                            
                            </tr> 
                            <tr>
                                <td colSpan= "4">
                                <div className="collapse" id={`collapseExample${e._id}`}>
                                    <div className="card card-body">
                                       


                                    {/* Task table Shwo here */}
                                    <div className = "container-fluid">
                                        <div className = "row">
                                            <div className = "col-10"></div>
                                            <div className = "col-2">
                                                <button  onClick = {handleClickCreateTask} type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#taskModal${e._id}`}>Create Task</button>
                                            </div>







                                    {/* Create task modal  Pending here modal
                                    
                                    
                                    
                                    need to connect to the backened and need to create button to add to the database
                                    
                                    
                                    
                                    
                                    
                                    
                                    */}

                                    <div className=" mt-5 t-5 modal fade" id={`taskModal${e._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Create Task</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">




                                                    {/* modal body */}
                                                    <form onSubmit = {(e) => e.preventDefault()} className="row g-3 needs-validation" novalidate>
                                                        
                                                        <div className="col-md-11">
                                                                <label for="validationCustom011" className="form-label">Task Title</label>
                                                                <input onChange = {(b) => {
                                                                    handleChangeTask(b)
                                                                }} type="text" name = "name" className="form-control" id="validationCustom011" value={createTask.name} required />
                                                                <div className="valid-feedback">
                                                                Looks good!
                                                                </div>
                                                            </div>

                                                            <div className="col-md-11">
                                                                <label for="validationCustom022" className="form-label">Task Description </label>
                                                                <textarea  onChange = {(d) => {
                                                                    handleChangeTask(d)
                                                                }} name = "description" className="form-control" id="validationCustom022" value={createTask.description} required></textarea>
                                                                <div className="valid-feedback">
                                                                Looks good!
                                                                </div>
                                                            </div>
                                                        
                                                        
                                                            <div>
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <InputLabel id="demo-multiple-chip-label">Assign Task to the User</InputLabel>
                                                                    <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    multiple
                                                                    value={personName}
                                                                    onChange={handleChange}
                                                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                                    renderValue={(selected) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={value} />
                                                                        ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                    >
                                                                    {names.map((name) => (
                                                                        <MenuItem
                                                                        key={name}
                                                                        value={name}
                                                                        style={getStyles(name, personName, theme)}
                                                                        >
                                                                        {name}
                                                                        </MenuItem>
                                                                    ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        
                                                                        
                                                            <div className="col-md-11">
                                                                <label for="validationCustom012" className="form-label">Task Time</label>
                                                                <input onChange = {(b) => {
                                                                    handleChangeTask(b)
                                                                }} type="date" name = "time" className="form-control" id="validationCustom012" value={createTask.time} required />
                                                                <div className="valid-feedback">
                                                                Looks good!
                                                                </div>
                                                            </div>

                                                            <div className="col-md-11">
                                                                <label for="validationCustom014" className="form-label">Task Status</label>
                                                                <input onChange = {(b) => {
                                                                    handleChangeTask(b)
                                                                }} type="text" name = "status" className="form-control" id="validationCustom014" value={createTask.status} required />
                                                                <div className="valid-feedback">
                                                                Looks good!
                                                                </div>
                                                            </div>
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button onClick = {() => handleCreateTaskBtn(e._id)} type="button" className="btn btn-primary">Create</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>






                                        </div>
                                        <div className = "row">


                                            {/* <div className = "col-12"> */}
                                                <Task handleTask = {handleShowAllTask} SetAllTask = {setAllTask} AllTask = {allTask} projectID = {e._id}/>
                                               
                                            {/* </div> */}
                                            
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


            
            <div className = "row">
                <div className = "col-8"></div>
                <div className = "col-4">
                    <nav aria-label="...">
                        <ul className="pagination">
                            
                            <Pagination page = {page} onChange = {handlePageChange} count={totalPages} variant="outlined" />
                            
                            
                        </ul>
                    </nav>
                </div>
            </div>



        </div>
    )
}
export {Project};