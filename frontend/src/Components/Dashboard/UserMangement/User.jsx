import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useFormik } from "formik";
import { Formik } from "formik";

import * as Yup from "yup";

const User = () => {
  const initState = {
    name: "",
    email: "",
    dateOfBirth: "",
    sex: "",
    bloodGroup: "",
    contactNumber: "",
    emergencyContactNumber: "",
    presentAddress: "",
    hobbies: "",
    panNumber: "",
    adharNumber: "",
    motherTongue: "",
    fatherName: "",
    motherName: ""
  };

  const [createUser, setCreateUser] = useState(initState);
  const [allUser, setAllUser] = useState([]);
  const [oneUser, setOneUser] = useState({});

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;

    setCreateUser({ ...createUser, [name]: value });
  };

  const handleCreateUserBtn = async () => {
    if (
      createUser.name === "" ||
      createUser.email === "" ||
      createUser.dateOfBirth === "" ||
      createUser.bloodGroup === "" ||
      createUser.contactNumber === "" ||
      createUser.emergencyContactNumber === "" ||
      createUser.presentAddress === "" ||
      createUser.hobbies === "" ||
      createUser.panNumber === "" ||
      createUser.adharNumber === "" ||
      createUser.motherTongue === "" ||
      createUser.fatherName === "" ||
      createUser.motherName === ""
    ) {
    } else {
      console.log("this is the name of the file");
      await axios.post("http://localhost:2233/user/create/user", createUser);
      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    }
  };

  // console.log(allUser);

  const getAllUser = async () => {
    const { data } = await axios.get(
      `http://localhost:2233/user/allUser/user?page=${page}&size=5`
    );
    setAllUser(data.user);
    setTotalPage(data.totalPage);
  };

  const handleUpdateUserOne = async (id) => {
    const { data } = await axios.get(
      `http://localhost:2233/user/one/user/${id}`
    );
    setOneUser(data);
  };

  const handleUpdateUserOneChange = (e) => {
    const { name, value } = e.target;
    setOneUser({ ...oneUser, [name]: value });
  };
  // console.log(oneUser.name);

  const handleUserUpdateOne = async (id) => {
    if (
      oneUser.name !== "" &&
      oneUser.email !== "" &&
      oneUser.dateOfBirth !== "" &&
      oneUser.contactNumber !== "" &&
      oneUser.emergencyContactNumber !== "" &&
      oneUser.presentAddress !== "" &&
      oneUser.panNumber !== "" &&
      oneUser.adharNumber !== "" &&
      oneUser.fatherName !== "" &&
      oneUser.motherName !== ""
    ) {
      delete oneUser._id;
      await axios.patch(
        `http://localhost:2233/user/oneUpdate/user/${id}`,
        oneUser
      );
      getAllUser();

      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    }
  };

  const handleDeleteUser = async (id) => {
    var z = window.confirm("Are you sure? ");

    if (z === true) {
      await axios.delete(`http://localhost:2233/user/ondelete/user/${id}`);
      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    } else {
      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    }
  };

  const handleUserSortingASC = async (e) => {
    if (e === "general") {
      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    } else if (e === "ascending") {
      const { data } = await axios.get(
        `http://localhost:2233/user/all/user/user/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    } else if (e === "descending") {
      const { data } = await axios.get(
        `http://localhost:2233/user/all/user/user/desc?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    }
  };

  const [Name, setName] = useState("");

  const handleNameSearch = async (name) => {
    if (name === "") {
      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    } else {
      const { data } = await axios.get(
        `http://localhost:2233/user/all/user/user/name/${name}`
      );
      setAllUser(data);
    }
  };

  // usedFormik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      sex: "",
      bloodGroup: "",
      contactNumber: "",
      emergencyContactNumber: "",
      presentAddress: "",
      hobbies: "",
      panNumber: "",
      adharNumber: "",
      motherTongue: "",
      fatherName: "",
      motherName: ""
    },

    onSubmit: async (values) => {
      console.log("this is the name of the file");
      await axios.post("http://localhost:2233/user/create/user", values);
      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      dateOfBirth: Yup.string().required("Required"),
      sex: Yup.string().required("Required"),
      bloodGroup: Yup.string().required("Required"),
      contactNumber: Yup.number()
        .min(10, "Must be 10 numbers")
        .required("Required"),
      emergencyContactNumber: Yup.number()
        .min(10, "Must be 10 numbers")
        .required("Required"),
      presentAddress: Yup.string().required("Required"),
      hobbies: Yup.string().required("Required"),
      panNumber: Yup.string().min(8, "Min 8 Characters").required("Required"),
      adharNumber: Yup.number().min(12, "Min 12 Number").required("Required"),
      maritialStatus: Yup.string().required("Required"),
      motherTongue: Yup.string().required("Required"),
      fatherName: Yup.string()
        .max(30, "Maximum 30 characters")
        .required("Required"),
      motherName: Yup.string()
        .max(30, "Maxmum 30 characters Required")
        .required("Required")
    })
  });

  // For updating user data

  const update = useFormik({
    initialValues: {
      name: oneUser.name,
      email: oneUser.email,
      dateOfBirth: oneUser.dateOfBirth,
      sex: oneUser.sex,
      bloodGroup: oneUser.bloodGroup,
      contactNumber: oneUser.contactNumber,
      emergencyContactNumber: oneUser.emergencyContactNumber,
      presentAddress: oneUser.presentAddress,
      hobbies: oneUser.hobbies,
      panNumber: oneUser.panNumber,
      adharNumber: oneUser.adharNumber,
      motherTongue: oneUser.Tongue,
      fatherName: oneUser.fatherName,
      motherName: oneUser.motherName
    },

    onSubmit: async (values) => {
      let id = oneUser._id;
      // delete oneUser._id;
      console.log(oneUser);
      await axios.patch(
        `http://localhost:2233/user/oneUpdate/user/${id}`,
        values
      );
      getAllUser();

      const { data } = await axios.get(
        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
      );
      setAllUser(data.user);
      setTotalPage(data.totalPage);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      dateOfBirth: Yup.string().required("Required"),
      sex: Yup.string().required("Required"),
      bloodGroup: Yup.string().required("Required"),
      contactNumber: Yup.number()
        .min(10, "Must be 10 numbers")
        .required("Required"),
      emergencyContactNumber: Yup.number()
        .min(10, "Must be 10 numbers")
        .required("Required"),
      presentAddress: Yup.string().required("Required"),
      hobbies: Yup.string().required("Required"),
      panNumber: Yup.string().min(8, "Min 8 Characters").required("Required"),
      adharNumber: Yup.number().min(12, "Min 12 Number").required("Required"),
      maritialStatus: Yup.string().required("Required"),
      motherTongue: Yup.string().required("Required"),
      fatherName: Yup.string()
        .max(30, "Maximum 30 characters")
        .required("Required"),
      motherName: Yup.string()
        .max(30, "Maxmum 30 characters Required")
        .required("Required")
    })
  });



  const validationUserSchema =  Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    dateOfBirth: Yup.string().required("Required"),
    sex: Yup.string().required("Required"),
    bloodGroup: Yup.string().required("Required"),
    contactNumber: Yup.number()
      .min(10, "Must be 10 numbers")
      .required("Required"),
    emergencyContactNumber: Yup.number()
      .min(10, "Must be 10 numbers")
      .required("Required"),
    presentAddress: Yup.string().required("Required"),
    hobbies: Yup.string().required("Required"),
    panNumber: Yup.string().min(8, "Min 8 Characters").required("Required"),
    adharNumber: Yup.number().min(12, "Min 12 Number").required("Required"),
    maritialStatus: Yup.string().required("Required"),
    motherTongue: Yup.string().required("Required"),
    fatherName: Yup.string()
      .max(30, "Maximum 30 characters")
      .required("Required"),
    motherName: Yup.string()
      .max(30, "Maxmum 30 characters Required")
      .required("Required")
  })

  useEffect(() => {
    getAllUser();
  }, [page]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="row">
          <div className="col-5"></div>
          <div className="col-3">
            <label className="form-label">Search by Name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
                handleNameSearch(e.target.value);
              }}
              value={Name}
              type="text"
              name="name"
              className="form-control"
              placeholder="enter the name"
            />
          </div>
          <div className="col-2">
            <div>
              <label>Sort by User Name</label>
              <select
                onChange={(e) => {
                  handleUserSortingASC(e.target.value);
                }}
              >
                <option selected disabled>
                  Select any option
                </option>
                <option value="general">General</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Button trigger modal --> */}

      {/* <!-- Create User Modal --> */}
      <div
        className=" mt-5 t-5 modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* this part is used for the formik thing  */}

              <form
                onSubmit={formik.handleSubmit}
                className="row g-3 needs-validation"
              >
                <div className="col-md-11">
                  <label
                    for="validationCustom01"
                    htmlFor="name"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="name"
                    className="form-control"
                    id="validationCustom01 name"
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="email"
                    className="form-label"
                  >
                    Email{" "}
                  </label>
                  <input
                    onChange={formik.handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    id="validationCustom02 email"
                    value={formik.values.email}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="dateOfBirth"
                    className="form-label"
                  >
                    Date of Birth{" "}
                  </label>
                  <input
                    type="date"
                    onChange={formik.handleChange}
                    name="dateOfBirth"
                    className="form-control"
                    id="validationCustom02"
                    value={formik.values.dateOfBirth}
                    required
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div>{formik.errors.dateOfBirth}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="sex"
                    className="form-label"
                  >
                    Sex{" "}
                  </label>
                  <select
                    name="sex"
                    onChange={formik.handleChange}
                    id="sex"
                    className="form-control"
                    value={formik.values.sex}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {formik.touched.sex && formik.errors.sex ? (
                    <div>{formik.errors.sex}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="bloodGroup"
                    className="form-label"
                  >
                    Blood Group{" "}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    name="bloodGroup"
                    className="form-control"
                    id="validationCustom02 bloodGroup"
                    value={formik.values.bloodGroup}
                  />
                  {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
                    <div>{formik.errors.bloodGroup}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="contactNumber"
                    className="form-label"
                  >
                    {" "}
                    Contact Number{" "}
                  </label>
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    name="contactNumber"
                    className="form-control"
                    id="validationCustom02 contactNumber"
                    value={formik.values.contactNumber}
                  />
                  {formik.touched.contactNumber &&
                  formik.errors.contactNumber ? (
                    <div>{formik.errors.contactNumber}</div>
                  ) : null}
                </div>

                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="emergencyContactNumber"
                    className="form-label"
                  >
                    Emergency Contact Number{" "}
                  </label>
                  <input
                    onChange={formik.handleChange}
                    type="number"
                    name="emergencyContactNumber"
                    className="form-control"
                    id="validationCustom02 emergencyContactNumber"
                    value={formik.values.emergencyContactNumber}
                  />
                  {formik.touched.emergencyContactNumber &&
                  formik.errors.emergencyContactNumber ? (
                    <div>{formik.errors.emergencyContactNumber}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="presentAddress"
                    className="form-label"
                  >
                    Present Address{" "}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    name="presentAddress"
                    className="form-control"
                    id="validationCustom02 presentAddress"
                    value={formik.values.presentAddress}
                  />
                  {formik.touched.presentAddress &&
                  formik.errors.presentAddress ? (
                    <div>{formik.errors.presentAddress}</div>
                  ) : null}
                </div>

                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="hobbies"
                    className="form-label"
                  >
                    Hobbies{" "}
                  </label>
                  <textarea
                    onChange={formik.handleChange}
                    name="hobbies"
                    className="form-control"
                    id="validationCustom02 hobbies"
                    value={formik.values.hobbies}
                  ></textarea>
                  {formik.touched.hobbies && formik.errors.hobbies ? (
                    <div>{formik.errors.hobbies}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="panNumber"
                    className="form-label"
                  >
                    Pan number{" "}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    name="panNumber"
                    className="form-control"
                    id="validationCustom02 presentAddress"
                    value={formik.values.panNumber}
                  />
                  {formik.touched.panNumber && formik.errors.panNumber ? (
                    <div>{formik.errors.panNumber} </div>
                  ) : null}
                </div>

                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="adharNumber"
                    className="form-label"
                  >
                    Adhar Number{" "}
                  </label>
                  <input
                    onChange={formik.handleChange}
                    type="number"
                    name="adharNumber"
                    className="form-control"
                    id="validationCustom02 adharNumber"
                    value={formik.values.adharNumber}
                  />

                  {formik.touched.adharNumber && formik.errors.adharNumber ? (
                    <div>{formik.errors.adharNumber}</div>
                  ) : null}
                </div>

                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="motherTongue"
                    className="form-label"
                  >
                    Mother Tongue{" "}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    name="motherTongue"
                    className="form-control"
                    id="validationCustom02 motherTongue"
                    value={formik.values.motherTongue}
                  />
                  {formik.touched.motherTongue && formik.errors.motherTongue ? (
                    <div>{formik.errors.motherTongue}</div>
                  ) : null}
                </div>

                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="maritialStatus"
                    className="form-label"
                  >
                    Marital Status{" "}
                  </label>
                  <select
                    name="maritialStatus"
                    onChange={formik.handleChange}
                    className="form-control"
                    id="validationCustom02 maritialStatus"
                    value={formik.values.maritialStatus}
                  >
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                  </select>
                  {formik.touched.maritialStatus &&
                  formik.errors.maritialStatus ? (
                    <div>{formik.errors.maritialStatus} </div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="fatherName"
                    className="form-label"
                  >
                    Father name{" "}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    name="fatherName"
                    className="form-control"
                    id="validationCustom02 fatherName"
                    value={formik.values.fatherName}
                  />
                  {formik.touched.fatherName && formik.errors.fatherName ? (
                    <div>{formik.errors.fatherName}</div>
                  ) : null}
                </div>
                <div className="col-md-11">
                  <label
                    for="validationCustom02"
                    htmlFor="motherName"
                    className="form-label"
                  >
                    Mother name{" "}
                  </label>
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    name="motherName"
                    className="form-control"
                    id="validationCustom02 motherName"
                    value={formik.values.motherName}
                  />
                  {formik.touched.motherName && formik.errors.motherName ? (
                    <div>{formik.errors.motherName}</div>
                  ) : null}
                </div>
                {/* <button onClick = {handleCreateUserBtn} type="submit" class="btn btn-primary">Submit</button> */}
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>

              {/* //this part use for the simple bootstrap  */}

              {/* modal body */}
              {/* <form onSubmit = {(e) => e.preventDefault()} className="row g-3 needs-validation" novalidate>
                                <div className="col-md-11">
                                    <label for="validationCustom01" className="form-label">Name</label>
                                    <input onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type="text" name = "name" className={(createUser.name === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom01" value={createUser.name} required />
                                     {
                                        createUser.name === "" ? (
                                            <div className = "invalid-feedback">
                                            Full name is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Email </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type = "email" name = "email" className={(createUser.email === "" ? ("form-control is-invalid") : ("form-control is-valid"))}                                    id="validationCustom02" value={createUser.email} required />
                                     {
                                        createUser.email === "" ? (
                                            <div className = "invalid-feedback">
                                            Email is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Date of Birth </label>
                                    <input  type = "date"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "dateOfBirth" className={(createUser.dateOfBirth === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom02" value={createUser.dateOfBirth} required />
                                     {
                                        createUser.dateOfBirth === "" ? (
                                            <div className = "invalid-feedback">
                                        date of birth is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
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
                                    }} name = "contactNumber" className={(createUser.contactNumber === "" ? ("form-control is-invalid") : ("form-control is-valid"))}id="validationCustom02" value={createUser.contactNumber} />
                                    {
                                        createUser.contactNumber === "" ? (
                                            <div className = "invalid-feedback">
                                            Contact Number  is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>
                                
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Emergency Contact Number </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type = "number" name = "emergencyContactNumber" className={(createUser.emergencyContactNumber === "" ? ("form-control is-invalid") : ("form-control is-valid"))}id="validationCustom02" value={createUser.EmergencyContactNumber} />
                                     {
                                        createUser.emergencyContactNumber === "" ? (
                                            <div className = "invalid-feedback">
                                            Emergency Contact Number is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Present Address </label>
                                    <input type = "text"  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} name = "presentAddress" className={(createUser.presentAddress === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom02" value={createUser.presentAddress} />
                                    {
                                        createUser.presentAddress === "" ? (
                                            <div className = "invalid-feedback">
                                            Present address is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
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
                                    }} name = "panNumber" className={(createUser.panNumber === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom02" value={createUser.panNumber} />
                                   {
                                        createUser.panNumber === "" ? (
                                            <div className = "invalid-feedback">
                                            Pan is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Adhar Number </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }}  type = "number" name = "adharNumber" className={(createUser.adharNumber === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom02" value={createUser.adharNumber} />
                                    
                                   { createUser.adharNumber === "" ? (
                                            <div className = "invalid-feedback">
                                            Addhar Number is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
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
                                    }} name = "fatherName" className={(createUser.fatherName === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom02" value={createUser.fatherName} />
                                   {
                                        createUser.fatherName === "" ? (
                                            <div className = "invalid-feedback">
                                            Father Name is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-11">
                                    <label for="validationCustom02" className="form-label">Mother name </label>
                                    <input  onChange = {(e) => {
                                        handleChangeUser(e)
                                    }} type = "text" name = "motherName" className={(createUser.motherName === "" ? ("form-control is-invalid") : ("form-control is-valid"))} id="validationCustom02" value={createUser.motherName} />
                                    {
                                        createUser.motherName === "" ? (
                                            <div className = "invalid-feedback">
                                            Mothername is required
                                            </div>
                                        ) : (
                                            <div className="valid-feedback">
                                                 Looks good!
                                            </div>
                                        )
                                    }
                                </div>
                                <button onClick = {handleCreateUserBtn} type="submit" class="btn btn-primary">Submit</button>
                                
                            </form> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button onClick = {handleCreateUserBtn} type="button" className="btn btn-primary">Create</button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Show All the Use to here to the dashboard. */}

      {/* <hr /> */}
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User name</th>
              <th scope="col">User email</th>
              <th scope="col">User contact Number</th>
              <th scope="col">User Address</th>
              <th scope="col">Action</th>
              <th scope="col">Show Details</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((e) => (
              <>
                <tr key={e._id}>
                  <th scope="row">{e.name}</th>
                  <th>{e.email}</th>
                  <th>{e.contactNumber}</th>
                  <td>{e.presentAddress}</td>
                  <td>
                    <i
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      onClick={() => {
                        handleUpdateUserOne(e._id);
                      }}
                      className="fas fa-edit"
                    ></i>

                    {/* 
                    Modal for update page */}

                    <div
                      className=" mt-5 t-5 modal fade"
                      id="updateModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Update User
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {/* update modal */}

                            <Formik
                            validationSchema = {validationUserSchema}
                              initialValues={{
                                name: oneUser.name ? oneUser.name : "",
                                email: oneUser.email ? oneUser.email : "",
                                dateOfBirth: oneUser.dateOfBirth
                                  ? oneUser.dateOfBirth
                                  : "",
                                sex: oneUser.sex ? oneUser.sex : "",
                                bloodGroup: oneUser.bloodGroup
                                  ? oneUser.bloodGroup
                                  : "",
                                contactNumber: oneUser.contactNumber
                                  ? oneUser.contactNumber
                                  : "",
                                emergencyContactNumber: oneUser.emergencyContactNumber
                                  ? oneUser.emergencyContactNumber
                                  : "",
                                presentAddress: oneUser.presentAddress
                                  ? oneUser.presentAddress
                                  : "",
                                hobbies: oneUser.hobbies ? oneUser.hobbies : "",
                                panNumber: oneUser.panNumber
                                  ? oneUser.panNumber
                                  : "",
                                adharNumber: oneUser.adharNumber
                                  ? oneUser.adharNumber
                                  : "",
                                motherTongue: oneUser.Tongue
                                  ? oneUser.Tongue
                                  : "",
                                fatherName: oneUser.fatherName
                                  ? oneUser.fatherName
                                  : "",
                                motherName: oneUser.motherName
                                  ? oneUser.motherName
                                  : ""
                              }}
                              enableReinitialize={true}
                              onSubmit={(values, actions) => {
                                setTimeout(async () => {

                                    await axios.patch(
                                        `http://localhost:2233/user/oneUpdate/user/${oneUser._id}`,
                                        values
                                      );
                                      getAllUser();
                                
                                      const { data } = await axios.get(
                                        `http://localhost:2233/user/allUser/user?page=${page}&size=5`
                                      );
                                      setAllUser(data.user);
                                      setTotalPage(data.totalPage);
                                }, 1000);
                              }}
                            >
                              {(props) => (
                                <form
                                  onSubmit={props.handleSubmit}
                                  className="row g-3 needs-validation"
                                >
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom01"
                                      htmlFor="name"
                                      className="form-label"
                                    >
                                      Name
                                    </label>
                                    <input
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      id="validationCustom01 name"
                                      value={props.values.name}
                                      required
                                    />
                                    {props.touched.name && props.errors.name ? (
                                      <div>{props.errors.name}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email{" "}
                                    </label>
                                    <input
                                      onChange={props.handleChange}
                                      type="email"
                                      name="email"
                                      className="form-control"
                                      id="validationCustom02 email"
                                      value={props.values.email}
                                      required
                                    />
                                    {props.touched.email &&
                                    props.errors.email ? (
                                      <div>{props.errors.email}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="dateOfBirth"
                                      className="form-label"
                                    >
                                      Date of Birth{" "}
                                    </label>
                                    <input
                                      type="date"
                                      onChange={props.handleChange}
                                      name="dateOfBirth"
                                      className="form-control"
                                      id="validationCustom02"
                                      value={props.values.dateOfBirth}
                                      required
                                    />
                                    {props.touched.dateOfBirth &&
                                    props.errors.dateOfBirth ? (
                                      <div>{props.errors.dateOfBirth}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="sex"
                                      className="form-label"
                                    >
                                      Sex{" "}
                                    </label>
                                    <select
                                      name="sex"
                                      onChange={props.handleChange}
                                      id="sex"
                                      className="form-control"
                                      value={props.values.sex}
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                    {props.touched.sex && props.errors.sex ? (
                                      <div>{props.errors.sex}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="bloodGroup"
                                      className="form-label"
                                    >
                                      Blood Group{" "}
                                    </label>
                                    <input
                                      type="text"
                                      onChange={props.handleChange}
                                      name="bloodGroup"
                                      className="form-control"
                                      id="validationCustom02 bloodGroup"
                                      value={props.values.bloodGroup}
                                    />
                                    {props.touched.bloodGroup &&
                                    props.errors.bloodGroup ? (
                                      <div>{props.errors.bloodGroup}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="contactNumber"
                                      className="form-label"
                                    >
                                      {" "}
                                      Contact Number{" "}
                                    </label>
                                    <input
                                      type="number"
                                      onChange={props.handleChange}
                                      name="contactNumber"
                                      className="form-control"
                                      id="validationCustom02 contactNumber"
                                      value={props.values.contactNumber}
                                    />
                                    {props.touched.contactNumber &&
                                    props.errors.contactNumber ? (
                                      <div>{props.errors.contactNumber}</div>
                                    ) : null}
                                  </div>

                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="emergencyContactNumber"
                                      className="form-label"
                                    >
                                      Emergency Contact Number{" "}
                                    </label>
                                    <input
                                      onChange={props.handleChange}
                                      type="number"
                                      name="emergencyContactNumber"
                                      className="form-control"
                                      id="validationCustom02 emergencyContactNumber"
                                      value={
                                        props.values.emergencyContactNumber
                                      }
                                    />
                                    {props.touched.emergencyContactNumber &&
                                    props.errors.emergencyContactNumber ? (
                                      <div>
                                        {props.errors.emergencyContactNumber}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="presentAddress"
                                      className="form-label"
                                    >
                                      Present Address{" "}
                                    </label>
                                    <input
                                      type="text"
                                      onChange={props.handleChange}
                                      name="presentAddress"
                                      className="form-control"
                                      id="validationCustom02 presentAddress"
                                      value={props.values.presentAddress}
                                    />
                                    {props.touched.presentAddress &&
                                    props.errors.presentAddress ? (
                                      <div>{props.errors.presentAddress}</div>
                                    ) : null}
                                  </div>

                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="hobbies"
                                      className="form-label"
                                    >
                                      Hobbies{" "}
                                    </label>
                                    <textarea
                                      onChange={props.handleChange}
                                      name="hobbies"
                                      className="form-control"
                                      id="validationCustom02 hobbies"
                                      value={props.values.hobbies}
                                    ></textarea>
                                    {props.touched.hobbies &&
                                    props.errors.hobbies ? (
                                      <div>{props.errors.hobbies}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="panNumber"
                                      className="form-label"
                                    >
                                      Pan number{" "}
                                    </label>
                                    <input
                                      type="text"
                                      onChange={props.handleChange}
                                      name="panNumber"
                                      className="form-control"
                                      id="validationCustom02 presentAddress"
                                      value={props.values.panNumber}
                                    />
                                    {props.touched.panNumber &&
                                    props.errors.panNumber ? (
                                      <div>{props.errors.panNumber} </div>
                                    ) : null}
                                  </div>

                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="adharNumber"
                                      className="form-label"
                                    >
                                      Adhar Number{" "}
                                    </label>
                                    <input
                                      onChange={props.handleChange}
                                      type="number"
                                      name="adharNumber"
                                      className="form-control"
                                      id="validationCustom02 adharNumber"
                                      value={props.values.adharNumber}
                                    />

                                    {props.touched.adharNumber &&
                                    props.errors.adharNumber ? (
                                      <div>{props.errors.adharNumber}</div>
                                    ) : null}
                                  </div>

                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="motherTongue"
                                      className="form-label"
                                    >
                                      Mother Tongue{" "}
                                    </label>
                                    <input
                                      type="text"
                                      onChange={props.handleChange}
                                      name="motherTongue"
                                      className="form-control"
                                      id="validationCustom02 motherTongue"
                                      value={props.values.motherTongue}
                                    />
                                    {props.touched.motherTongue &&
                                    props.errors.motherTongue ? (
                                      <div>{props.errors.motherTongue}</div>
                                    ) : null}
                                  </div>

                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="maritialStatus"
                                      className="form-label"
                                    >
                                      Marital Status{" "}
                                    </label>
                                    <select
                                      name="maritialStatus"
                                      onChange={props.handleChange}
                                      className="form-control"
                                      id="validationCustom02 maritialStatus"
                                      value={props.values.maritialStatus}
                                    >
                                      <option value="Married">Married</option>
                                      <option value="Unmarried">
                                        Unmarried
                                      </option>
                                    </select>
                                    {props.touched.maritialStatus &&
                                    props.errors.maritialStatus ? (
                                      <div>{props.errors.maritialStatus} </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="fatherName"
                                      className="form-label"
                                    >
                                      Father name{" "}
                                    </label>
                                    <input
                                      type="text"
                                      onChange={props.handleChange}
                                      name="fatherName"
                                      className="form-control"
                                      id="validationCustom02 fatherName"
                                      value={props.values.fatherName}
                                    />
                                    {props.touched.fatherName &&
                                    props.errors.fatherName ? (
                                      <div>{props.errors.fatherName}</div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-11">
                                    <label
                                      for="validationCustom02"
                                      htmlFor="motherName"
                                      className="form-label"
                                    >
                                      Mother name{" "}
                                    </label>
                                    <input
                                      onChange={props.handleChange}
                                      type="text"
                                      name="motherName"
                                      className="form-control"
                                      id="validationCustom02 motherName"
                                      value={props.values.motherName}
                                    />
                                    {props.touched.motherName &&
                                    props.errors.motherName ? (
                                      <div>{props.errors.motherName}</div>
                                    ) : null}
                                  </div>

                                  <button type="submit" class="btn btn-primary">
                                    Submit
                                  </button>
                                </form>
                              )}
                            </Formik>

                            {/* modal body */}
                            {/* <form
                              onSubmit={(a) => a.preventDefault()}
                              className="row g-3 needs-validation"
                              novalidate
                            >
                              <div className="col-md-11">
                                <label
                                  for="validationCustom0133"
                                  className="form-label"
                                >
                                  Name
                                </label>
                                <input
                                  onChange={(b) => {
                                    handleUpdateUserOneChange(b);
                                  }}
                                  type="text"
                                  name="name"
                                  className={
                                    oneUser.name === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom0133"
                                  value={oneUser.name}
                                  required
                                />

                                {oneUser.name === "" ? (
                                  <div className="invalid-feedback">
                                    Name filled is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom02"
                                  className="form-label"
                                >
                                  Email{" "}
                                </label>
                                <input
                                  onChange={(b) => {
                                    handleUpdateUserOneChange(b);
                                  }}
                                  type="email"
                                  name="email"
                                  className={
                                    oneUser.email === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom02"
                                  value={oneUser.email}
                                  required
                                />
                                {oneUser.email === "" ? (
                                  <div className="invalid-feedback">
                                    Email filled is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom03"
                                  className="form-label"
                                >
                                  Date of Birth{" "}
                                </label>
                                <input
                                  type="date"
                                  onChange={(b) => {
                                    handleUpdateUserOneChange(b);
                                  }}
                                  name="dateOfBirth"
                                  className={
                                    oneUser.dateOfBirth === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom03"
                                  value={oneUser.dateOfBirth}
                                  required
                                />
                                {oneUser.dateOfBirth === "" ? (
                                  <div className="invalid-feedback">
                                    D.O.B is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom04"
                                  className="form-label"
                                >
                                  Sex{" "}
                                </label>
                                <select
                                  id="validationCustom04"
                                  name="sex"
                                  onChange={(b) => handleUpdateUserOneChange(b)}
                                  className="form-control"
                                  value={oneUser.sex}
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom05"
                                  className="form-label"
                                >
                                  Blood Group{" "}
                                </label>
                                <input
                                  type="text"
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="bloodGroup"
                                  className="form-control"
                                  id="validationCustom05"
                                  value={oneUser.bloodGroup}
                                />
                                <div className="valid-feedback">
                                  Looks good!
                                </div>
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom06"
                                  className="form-label"
                                >
                                  {" "}
                                  Contact Number{" "}
                                </label>
                                <input
                                  type="number"
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="contactNumber"
                                  className={
                                    oneUser.contactNumber === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom06"
                                  value={oneUser.contactNumber}
                                  required
                                />
                                {oneUser.contactNumber === "" ? (
                                  <div className="invalid-feedback">
                                    Contact Number is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>

                              <div className="col-md-11">
                                <label
                                  for="validationCustom07"
                                  className="form-label"
                                >
                                  Emergency Contact Number{" "}
                                </label>
                                <input
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  type="number"
                                  name="emergencyContactNumber"
                                  className={
                                    oneUser.emergencyContactNumber === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom02"
                                  value={oneUser.EmergencyContactNumber}
                                  required
                                />
                                {oneUser.emergencyContactNumber === "" ? (
                                  <div className="invalid-feedback">
                                    Emergency Contact Number is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom08"
                                  className="form-label"
                                >
                                  Present Address{" "}
                                </label>
                                <input
                                  type="text"
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="presentAddress"
                                  className={
                                    oneUser.presentAddress === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom08"
                                  value={oneUser.presentAddress}
                                  required
                                />
                                {oneUser.presentAddress === "" ? (
                                  <div className="invalid-feedback">
                                    Address is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>

                              <div className="col-md-11">
                                <label
                                  for="validationCustom09"
                                  className="form-label"
                                >
                                  Hobbies{" "}
                                </label>
                                <textarea
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="hobbies"
                                  className="form-control"
                                  id="validationCustom09"
                                  value={oneUser.hobbies}
                                ></textarea>
                                <div className="valid-feedback">
                                  Looks good!
                                </div>
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom10"
                                  className="form-label"
                                >
                                  Pan number{" "}
                                </label>
                                <input
                                  type="text"
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="panNumber"
                                  className={
                                    oneUser.panNumber === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom10"
                                  value={oneUser.panNumber}
                                  required
                                />
                                {oneUser.panNumber === "" ? (
                                  <div className="invalid-feedback">
                                    Pan is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>

                              <div className="col-md-11">
                                <label
                                  for="validationCustom11"
                                  className="form-label"
                                >
                                  Adhar Number{" "}
                                </label>
                                <input
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  type="number"
                                  name="adharNumber"
                                  className={
                                    oneUser.adharNumber === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom11"
                                  value={oneUser.adharNumber}
                                  required
                                />
                                {oneUser.adharNumber === "" ? (
                                  <div className="invalid-feedback">
                                    Adhar is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>

                              <div className="col-md-11">
                                <label
                                  for="validationCustom12"
                                  className="form-label"
                                >
                                  Mother Tongue{" "}
                                </label>
                                <input
                                  type="text"
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="motherTongue"
                                  className="form-control"
                                  id="validationCustom12"
                                  value={oneUser.motherTongue}
                                  required
                                />
                                <div className="valid-feedback">
                                  Looks good!
                                </div>
                              </div>

                              <div className="col-md-11">
                                <label
                                  for="validationCustom13"
                                  className="form-label"
                                >
                                  Marital Status{" "}
                                </label>
                                <select
                                  id="validationCustom13"
                                  name="maritialStatus"
                                  onChange={(d) => handleUpdateUserOneChange(d)}
                                  value={oneUser.maritialStatus}
                                  className="form-control"
                                >
                                  <option value="Married">Married</option>
                                  <option value="Unmarried">Unmarried</option>
                                </select>
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom14"
                                  className="form-label"
                                >
                                  Father name{" "}
                                </label>
                                <input
                                  type="text"
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  name="fatherName"
                                  className={
                                    oneUser.fatherName === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom14"
                                  value={oneUser.fatherName}
                                  required
                                />
                                {oneUser.fatherName === "" ? (
                                  <div className="invalid-feedback">
                                    Adhar is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>
                              <div className="col-md-11">
                                <label
                                  for="validationCustom15"
                                  className="form-label"
                                >
                                  Mother name{" "}
                                </label>
                                <input
                                  onChange={(d) => {
                                    handleUpdateUserOneChange(d);
                                  }}
                                  type="text"
                                  name="motherName"
                                  className={
                                    oneUser.motherName === ""
                                      ? "form-control is-invalid"
                                      : "form-control is-valid"
                                  }
                                  id="validationCustom15"
                                  value={oneUser.motherName}
                                  required
                                />
                                {oneUser.motherName === "" ? (
                                  <div className="invalid-feedback">
                                    Adhar is required
                                  </div>
                                ) : (
                                  <div className="valid-feedback">
                                    Looks good!
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleUserUpdateOne(e._id)}
                                type="button"
                                className="btn btn-primary"
                              >
                                Update
                              </button>
                            </form> */}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span> {"    "}</span>
                    <i
                      onClick={() => handleDeleteUser(e._id)}
                      className="fas fa-trash-alt"
                    ></i>
                    {/* <FontAwesomeIcon icon="fa-duotone fa-eye" /> */}
                  </td>
                  <td>
                    <button
                      onClick={() => handleUpdateUserOne(e._id)}
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseExample${e._id}`}
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      User All Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6">
                    <div className="collapse" id={`collapseExample${e._id}`}>
                      <div className="card card-body">
                        {/* Task table Shwo here */}
                        <div className="container-fluid">
                          <div className="row">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th> </th>
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
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-8"></div>
        <div className="col-4">
          <nav aria-label="...">
            <ul className="pagination">
              <Pagination
                page={page}
                onChange={handlePageChange}
                count={totalPage}
                variant="outlined"
              />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export  {User};
