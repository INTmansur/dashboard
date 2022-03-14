
// import {useState, useEffect} from "react";
// import axios from "axios";



// const Profilea = () => {
//     const [user, setUser] = useState({});
//     const [img, setImg] = useState("")

//     const handleSubmitProfile = async () => {
//         let User= JSON.parse(sessionStorage.getItem("userid"))
//         console.log(User);
//         // console.log(sessionStorage.getItem("userId"))
//         const d = {
//             profile_picture : img
//         }
//     //    console.log(d);

//         await axios.put(`http://localhost:2233/user/image/${User._id}`, d)
//         // sessionStorage.setItem("userId", data);
//         // console.log(data);

//     }

//     return (
//         <div>
//             <form onSubmit = {(e) => {
//                 e.preventDefault();

//             }} method = "post" enctype="multipart/form-data">
//                 <input type = "file" onChange = {(e) => setImg(e.target.value)} name = "profile_picture" />
//                 <button onClick = {handleSubmitProfile}>Upload</button>
//             </form>
//             {/* <div>
//                 <img src = {``} alt = "image" />
//             </div> */}
          
//         </div>
//     )
// }



// export {Profilea}

import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';

const Profilea = () => {



  const initUser = {
    name : "",
    email : "",
    dateOfBirth: "",
    sex : "",
    bloodGroup : "",
    contactNumber : "",
    emergencyContactNumber : "",
    presentAddress : "",
    hobbies : "",
    panNumber : "",
    adharNumber : "",
    motherTongue: "",
    fatherName : "",
    motherName: "",
    role : ""
}
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [user, setUser] = React.useState(initUser)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
    try {
        let User= JSON.parse(sessionStorage.getItem("userid"))
      const response = await axios({
        method: "post",
        // baseUrl : "",
        url: `http://localhost:2233/user/image/image/image/image/image/${User._id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      sessionStorage.setItem("userid", JSON.stringify(response.data));
      setUser(response.data);
    //   console.log(response.data);
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  useEffect( async () => {
    let User= JSON.parse(sessionStorage.getItem("userid"))
   

        const {data} = await axios.get(`http://localhost:2233/user/one/user/${User._id}`)
        

    setUser(data);
  }, [])
  return (
      
        <div className = "container-fluid">
            
            <div className = "row">


                {/* <div className = "col-12"> */}
                    <div className = "col-2"></div>
                          <div className = "col-8">
                              <div className="card mb-3">
                                {/* <img src =  alt = "Another image" /> */}
                                  <div className = "row">
                                      {/* <div className = "col-12"> */}
                                        <div className = "col-2"></div>
                                        <div className = "col-8">
                                          {/* card-img-top */}
                                            {
                                                user.profile_picture === "" ? (
                                                    <img src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-27.jpg" style={{ height: 300 }}   className="card-img-top" alt="..." />
                                                ) : (
                                                    <img src={`uploads/${user.profile_picture}`} style={{ height: 300 }}   className="card-img-top" alt="..." />
                                                )
                                            }
                                          
                                           
                                            <form onSubmit={handleSubmit}>
                                        <input type="file" onChange={handleFileSelect} required/>
                                        <input type="submit" value="Update profile Picture" />
                                    </form>
                                        </div>
                                        <div className = "col-2"></div>
                                      {/* </div> */}
                                  </div>
                                  <div className = "col-12"> 
                                      
                                  <div className="card-body">
                                      <h5 className="card-title">profile Details</h5>
                                      <table className = "table">
                                          <thead>
                                              <tr>
                                                  <th></th>
                                                  <th>Details</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr>
                                                  <th>Name: </th>
                                                  <td>{user.name === "" ? (<span>NA</span>) : (user.name)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Email:</th>
                                                  <td>{user.email === "" ? (<span>NA</span>) : (user.email)}</td>
                                              </tr>
                                              <tr>
                                                  <th>D.O.B</th>
                                                  <td>{user.dateOfBirth === "" ? (<span>NA</span>) : (user.dateOfBirth)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Sex: </th>
                                                  <td>{user.sex === "" ? ("NA") : (user.sex)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Blood Group:</th>
                                                  <td>{user.bloodGroup === "" ? ("NA") : (user.bloodGroup)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Contact Number:</th>
                                                  <td>{user.contactNumber === "" ? ("NA") : (user.contactNumber)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Emergency Contact Number:</th>
                                                  <td>{user.emergencyContactNumber === "" ? ("NA") : (user.emergencyContactNumber)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Presend Address: </th>
                                                  <td>{user.presentAddress === "" ? ("NA") : (user.presentAddress)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Hobbies: </th>
                                                  <td>{user.hobbies === "" ? ("NA") : (user.hobbies)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Pan Number : </th>
                                                  <td>{user.panNumber === "" ? ("NA") : (user.panNumber)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Adhar Number : </th>
                                                  <td>{user.adharNumber === "" ? ("NA") : (user.adharNumber)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Mother tongue : </th>
                                                  <td>{user.motherTongue === "" ? ("NA") : (user.motherTongue)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Father Name: </th>
                                                  <td>{user.fatherName === "" ? ("NA") : (user.fatherName)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Mother Name: </th>
                                                  <td>{user.motherName === "" ? ("NA") : (user.motherName)}</td>
                                              </tr>
                                              <tr>
                                                  <th>Role: </th>
                                                  <td>{user.role === "" ? ("NA") : (user.role)}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>

                          </div>
                    
                  </div>
                  <div className = "col-2"></div>



            
            
       
           
           
           
           
           
           
           
           
           
                 {/* </div> */}
            </div>
        </div>
      
    
  )
};

export {Profilea};