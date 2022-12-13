import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  makeStyles,
  Container,
  Button,
  Grid,
  ButtonGroup,
} from '@material-ui/core';
import { AddCircle, Edit, Delete } from '@material-ui/icons';
import { PacmanLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from '../data/userData';
import MainDialog from './MainDialog';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../firebase/db';
const firestore = firebase.firestore();

const MainPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [userId, setUserId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [datetime, setDateTime] = useState('');
  const [time, setTime] = useState('');
  const [countryNew, setCountryNew] = useState('');
  const [datetimeNew, setDateTimeNew] = useState('');
  const [timeNew, setTimeNew] = useState('');
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const overrideBody = `
        text-align:center;
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;

  const handleClose = () => {
    setOpen(false);
  };
  const handleFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastname = (event) => {
    setLastname(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleDateTime = (event) => {
    setDateTime(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const handleCountryNew = (newCountryValue) => {
    setCountryNew(newCountryValue);
    console.log(newCountryValue);
  };
  const handleDateTimeNew = (newDateValue) => {
    setDateTimeNew(newDateValue);
    console.log(newDateValue);
  };

  const handleTimeNew = (newTimeValue) => {
    setTimeNew(newTimeValue);
    console.log(newTimeValue);
  };

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getUsers();
      setUsers(list);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const getOneUser = async (id) => {
    try {
      setFormMode(false);
      setUserId(id);
      const response = await getUser(id);
      setFirstname(response.firstname);
      setLastname(response.lastname);
      setCountry(response.country);
      setDateTime(response.datetime);
      setTime(response.time);
      setOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      getlist();
      toast.success('User Deleted Successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
    setFirstname('');
    setLastname('');
    setCountry('');
    setDateTime('');
    setTime('');
  };

  const addUserHandler = async () => {
    try {
      const user = {
        firstname,
        lastname,
        country,
        datetime,
        time,
      };
      if (formMode) {
        await addUser(user);
        toast.success('User Added Successfully');
        getlist();
        setOpen(false);
        setFirstname('');
        setLastname('');
        setCountry('');
        setDateTime('');
        setTime('');
      } else {
        await updateUser(userId, user);
        toast.success('Uesr Updated Successfully');
        getlist();
        setOpen(false);
        setFirstname('');
        setLastname('');
        setCountry('');
        setDateTime('');
        setTime('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getlist();
  }, []);
  /* Pagination */
  useEffect(() => {
    const fetchData = async () => {
      await firebase
        .firestore()
        .collection('users')
        .orderBy('datetime', 'desc')
        .limit(5)
        .onSnapshot(function (querySnapshot) {
          var items = [];
          querySnapshot.forEach(function (doc) {
            items.push({ key: doc.id, ...doc.data() });
          });
          console.log('first item ', items[0]);
          setList(items);
        });
    };
    fetchData();
  }, []);

  const showNext = ({ item }) => {
    if (list.length === 0) {
      alert('Thats all we have for now !');
    } else {
      const fetchNextData = async () => {
        await firebase
          .firestore()
          .collection('users')
          .orderBy('datetime', 'desc')
          .limit(5)
          .startAfter(item.datetime)
          .onSnapshot(function (querySnapshot) {
            const items = [];
            querySnapshot.forEach(function (doc) {
              items.push({ key: doc.id, ...doc.data() });
            });
            setList(items);
            setPage(page + 1);
          });
      };
      fetchNextData();
    }
  };
  const showPrevious = ({ item }) => {
    if (page < 1) {
      alert('Thats all we have for now !');
      console.log(page);
    }
    const fetchPreviousData = async () => {
      await firebase
        .firestore()
        .collection('users')
        .orderBy('datetime', 'desc')
        .endBefore(item.datetime)
        .limitToLast(5)
        .onSnapshot(function (querySnapshot) {
          const items = [];
          querySnapshot.forEach(function (doc) {
            items.push({ key: doc.id, ...doc.data() });
          });
          setList(items);
          setPage(page - 1);
        });
    };
    fetchPreviousData();
  };
  return (
    <Container className={classes.container}>
      <ToastContainer />

      <TableContainer component={Paper}>
        <Grid container>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              className={classes.button}
              startIcon={<AddCircle />}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={10}>
            <ButtonGroup>
              <Button onClick={() => showPrevious({ item: list[0] })}>
                Previous
              </Button>

              <Button onClick={() => showNext({ item: list[list.length - 1] })}>
                Next
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>First Name</TableCell>
              <TableCell className={classes.head}>Last Name</TableCell>
              <TableCell className={classes.head}>Country</TableCell>
              <TableCell className={classes.head}>Date Time</TableCell>
              <TableCell className={classes.head}>Time</TableCell>
              {/* <TableCell className={classes.head}>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <PacmanLoader
                    css={overrideBody}
                    size={150}
                    color={'#FFB200'}
                    loading={loading}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <React.Fragment>
                {list.map((users) => (
                  <TableRow key={users.id}>
                    <TableCell>{users.firstname}</TableCell>
                    <TableCell>{users.lastname} </TableCell>
                    <TableCell>{users.country}</TableCell>
                    <TableCell>{users.datetime}</TableCell>
                    <TableCell>{users.time}</TableCell>
                    {/* <TableCell>
                      <IconButton
                        onClick={() => getOneUser(users.id)}
                        color="primary"
                        aria-label="update user"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteHandler(users.id)}
                        color="secondary"
                        aria-label="delete user"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </React.Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MainDialog
        open={open}
        close={handleClose}
        formmode={formMode}
        firstname={firstname}
        lastname={lastname}
        country={country}
        datetime={datetime}
        time={time}
        countrynew={countryNew}
        datetimenew={datetimeNew}
        timenew={timeNew}
        changefirstname={handleFirstname}
        changelastname={handleLastname}
        changecountry={handleCountry}
        changedatetime={handleDateTime}
        changetime={handleTime}
        changecountrynew={handleCountryNew}
        changedatetimenew={handleDateTimeNew}
        changetimenew={handleTimeNew}
        addUser={addUserHandler}
      />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: '40px',
  },
  title: {
    flex: '1 1 100%',
    padding: '20px',
    fontSize: '20px',
  },
  head: {
    paddingLeft: '20px',
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  button: {
    margin: theme.spacing(1),
    float: 'right',
    backgroundColor: theme.palette.warning.light,
  },
}));

export default MainPage;
