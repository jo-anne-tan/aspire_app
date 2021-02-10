import React, { useEffect, useState, useReducer } from "react";

import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {  makeStyles } from "@material-ui/core/styles";
import {
  Input,
  InputAdornment,
  TextField,
  Button,
  Box,
  Container,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { ContactlessOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  paper2: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 1),
    color: theme.palette.text.secondary,
    whiteSpace: "wrap",
    justifyItems: "stretch",
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    backgroundColor: "#D9E4EC",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: "50vw",
  },
}));

const CreateNewTutorSessionPage = () => {
  const classes = useStyles();
  let tutor_id = localStorage.getItem("id");
  const jwt = localStorage.getItem("jwt");
  let zoomlink = null;
  let zoomhost = null;

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [titleNull, setTitleNull] = useState(true);
  const [dateNull, setDateNull] = useState(true);
  const [startTimeNull, setStartTimeNull] = useState(true);
  const [endTimeNull, setEndTimeNull] = useState(true);

  const [age, updateAge] = useState(0);
  const [email, updateEmail] = useState("");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [isFemale, updateIsFemale] = useState(false);
  const [profilePhoto, updateProfilePhoto] = useState("");
  const [rating, updateRating] = useState(5);
  const [username, updateUsername] = useState("");
  const [subject, setSubject] = useState("");
  const [maxStudentCapacity, setMaxStudentCapacity] = useState("");
  const [price, setPrice] = useState(0);
  // const subjects = [];

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      subject: 0,
      title: "",
      description: "",
      price: 100,
      // duration: 2,
      max_student_capacity: 5,
      start_year: "2021",
      start_month: "2",
      start_day: "11",
      start_hour: "14",
      start_minute: "30",
      end_year: "2021",
      end_month: "2",
      end_day: "11",
      end_hour: "16",
      end_minute: "30",
      zoom_host: "",
      zoom_participant: "",
    }
  );

  // Retrieve tutor
  useEffect(() => {
    axios
      .get(`https://aspire-api2021.herokuapp.com/api/v1/tutors/${tutor_id}`)
      .then((res) => {
        updateAge(res.data.age);
        updateEmail(res.data.email);
        updateFirstName(res.data.first_name);
        updateLastName(res.data.last_name);
        updateIsFemale(res.data.is_female);
        updateProfilePhoto(res.data.profile_image);
        updateRating(res.data.rating);
        updateUsername(res.data.username);
      });
  }, [tutor_id]);

  // Retrieve subject
  // useEffect(() => {
  //   axios
  //     .get(`https://aspire-api2021.herokuapp.com/api/v1/subjects/`)
  //     .then((res) => {
  //       subjects.push(res.data);
  //       console.log(subjects);
  //     });
  // }, []);

  // Form check
  useEffect(() => {
    if (
      subject !== "" &&
      maxStudentCapacity !== "" &&
      price !== "" &&
      !titleNull &&
      !dateNull &&
      !startTimeNull &&
      !endTimeNull
    ) {
      setSubmitDisabled(false);
      handleZoomlink();
    }
  }, [
    subject,
    maxStudentCapacity,
    price,
    titleNull,
    dateNull,
    startTimeNull,
    endTimeNull,
    zoomlink,
    zoomhost,
  ]);

  const handleSubjectDropdownChange = (event) => {
    setSubject(event.target.value);
    // console.log(event.target.value);
    setFormInput({ subject: event.target.value });
  };

  const handleStudentCapacityDropdownChange = (event) => {
    setMaxStudentCapacity(event.target.value);
    // console.log(event.target.value);
    setFormInput({ max_student_capacity: event.target.value });
  };

  const handleTitleInput = (evt) => {
    const title = evt.target.value;
    setTitleNull(false);
    setFormInput({ title: title });
  };

  const handleDescriptionInput = (evt) => {
    const description = evt.target.value;
    setFormInput({ description: description });
  };

  const handlePriceChange = (evt) => {
    const price = evt.target.value;
    setPrice(price);
    setFormInput({ price: Number(price) });
  };

  const handleDateChange = (evt) => {
    // console.log(evt.target.value);
    const year = evt.target.value.substring(0, 4);
    const month = evt.target.value.substring(5, 7);
    const day = evt.target.value.substring(8, 10);
    setDateNull(false);

    setFormInput({
      start_year: year,
      start_month: month,
      start_day: day,
      end_year: year,
      end_month: month,
      end_day: day,
    });
  };

  const handleStartTime = (evt) => {
    console.log(evt);
    const hour = evt.target.value.substring(0, 2);
    const minute = evt.target.value.substring(3, 5);
    setStartTimeNull(false);

    setFormInput({
      start_hour: hour,
      start_minute: minute,
    });
  };

  const handleEndTime = (evt) => {
    // console.log(evt.target.value);
    const hour = evt.target.value.substring(0, 2);
    const minute = evt.target.value.substring(3, 5);
    setEndTimeNull(false);

    setFormInput({
      end_hour: hour,
      end_minute: minute,
    });
  };

  const calculateDuration = () => {
    let start_minute = parseInt(formInput["start_minute"]);
    let start_hour = parseInt(formInput["start_hour"]);
    let end_minute = parseInt(formInput["end_minute"]);
    let end_hour = parseInt(formInput["end_hour"]);

    if (start_minute > end_minute) {
      end_hour = end_hour - 1;
      end_minute = end_minute + 60;
    }
    let duration_minute = end_minute - start_minute;
    let duration_hour = end_hour - start_hour;
    const duration = `${duration_hour} hour(s) ${duration_minute} minute(s)`;
    return duration;
  };

  //tester
  const handleZoomlink = () => {
    console.log("generating zoom link");
    setFormInput({
      zoom_host: "https://us05web.zoom.us/j/85496237435?pwd=dHFBc2RieTBxN0pmQmd0SGQ4RG9adz09",
      zoom_participant: "https://us05web.zoom.us/j/85496237435?pwd=dHFBc2RieTBxN0pmQmd0SGQ4RG9adz09",
    });
  };

  // const handleZoomLink = () => {
  //   console.log("generating zoom link");

  //   axios({
  //     method: "POST",
  //     url: "https://api.zoom.us/v2/users/danialridh1@gmail.com/meetings",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //     data: {
  //       topic: `${formInput.title}`,
  //       type: 2,
  //       start_time: `${formInput.start_hour}`,
  //       duration: `${duration}`,
  //       timezone: "MY"
  //     },
  //   })
  //     .then((res) => {
  //       console.log("zoom link generated");
  //       console.log(res);

  //     axios({
  //       method: "GET",
  //       url:"https://api.zoom.us/v2/users/danialridh1@gmail.com/meetings?page_size=30&type=scheduled",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       },
  //     })
  //       .then((res) => {
  //         console.log("getting meeting list")
  //         console.log(res)
  //         zoomlink = res.data.meetings.join_url;
  //         zoomhost = res.data.meetings.host_id;
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));

  //   setFormInput({
  //     zoom_host: zoomhost,
  //     zoom_participant: zoomlink,
  //   })
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(calculateDuration());
    handleZoomlink();

    let data = formInput;

    // console.log(JSON.stringify(data));
    // console.log(data);

    // DO AXIOS POST REQUEST TO SUBMIT FORM WITH ALL DETAILS AND ZOOM API

    axios({
      method: "POST",
      url: "https://aspire-api2021.herokuapp.com/api/v1/tutor_sessions/new",
      data: data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div
        style={{
          marginTop: "15vh",
          marginLeft: "5vw",
          marginRight: "5vw",
          minHeight: "100vh",
        }}
        className={classes.root}
      >
        <h1>Create New Tutor Session</h1>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Container>
                <Avatar alt={`${firstName} ${lastName}`} src={profilePhoto} />
                <Box fontSize="h6.fontSize">
                  {firstName} {lastName}
                </Box>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={parseFloat(rating)}
                    readOnly
                  />
                  <Typography component="legend">
                    {parseFloat(rating).toFixed(1)}/5.0
                  </Typography>
                </Box>
                <Box>Age : {age} </Box>
                <Box>Gender : {isFemale ? "Female" : "Male"}</Box>
                <Box fontSize="h6.fontSize" fontStyle="italic">
                  @{username}
                </Box>
                <Box>{email}</Box>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper2}>
              <form id="create-tutor-sesion" onSubmit={handleSubmit}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="subject"
                    value={subject}
                    onChange={handleSubjectDropdownChange}
                    label="Subject"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    <MenuItem value={1}>Language</MenuItem>
                    <MenuItem value={2}>Mathematics</MenuItem>
                    <MenuItem value={3}>Coding</MenuItem>
                    <MenuItem value={4}>Accounting</MenuItem>
                    <MenuItem value={5}>Life Skills</MenuItem>
                  </Select>
                  <FormHelperText>Subject category</FormHelperText>
                </FormControl>
                <TextField
                  label="Title"
                  id="title"
                  name="title"
                  defaultValue={formInput.name}
                  className={classes.textField}
                  helperText="e.g. English Level 1"
                  onChange={handleTitleInput}
                />

                <FormControl className={classes.formControl}>
                  <Input
                    id="standard-adornment-amount"
                    value={price}
                    onChange={handlePriceChange}
                    startAdornment={
                      <InputAdornment position="start">RM</InputAdornment>
                    }
                  />
                  <FormHelperText>Price per hour</FormHelperText>
                </FormControl>
                <TextField
                  id="date"
                  name="date"
                  type="date"
                  className={classes.textField}
                  onChange={handleDateChange}
                  helperText="Date"
                />
                <TextField
                  id="start_time"
                  type="time"
                  className={classes.textField}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={handleStartTime}
                  helperText="Start Time"
                />
                <TextField
                  id="end_time"
                  type="time"
                  className={classes.textField}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={handleEndTime}
                  helperText="End Time"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Max Student Capacity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="max_student_capacity"
                    value={maxStudentCapacity}
                    onChange={handleStudentCapacityDropdownChange}
                    label="Subject"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Description"
                  id="description"
                  multiline
                  rows={4}
                  name="description"
                  defaultValue={formInput.name}
                  className={classes.textField}
                  onChange={handleDescriptionInput}
                />
                <Button
                  disabled={submitDisabled}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  CREATE
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CreateNewTutorSessionPage;
