import {
  useEffect,
  useState,
  useMemo,
} from "react";

import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


const User = ({ details }) => {
  const { firstname, lastname, image } = details
  return (<Grid
    container
    direction="row"
    justify="left"
    alignItems="center"
  >
    <Avatar alt={`${firstname}, ${lastname}`} src={`${image}?p=${firstname}${lastname}`} />
    <Box marginLeft={ 2 }>{firstname} { lastname }</Box>
  </Grid>)
}

const Gender = ({ type }) => {
  return <Box>{ type }</Box>
}

const Location = ({ details }) => {
  const { latitude, longitude, country } = details
  return (<Button color="primary" href={`//maps.google.com/maps?q={latitude},{longitude}`}>
    {country}
  </Button>)
}

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const columns = useMemo(() => ([
    {
      Header: 'Name',
      accessor: row => `${row.firstname} ${row.lastname}`,
      id: 'name',
      Cell: ({row}) => <User details={row.original} />
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      Cell: ({value}) => <Gender type={value} />
    },
    {
      Header: 'DOB',
      accessor: 'birthday',
      id: 'birthday',
    },
    {
      Header: 'e-mail',
      accessor: 'email',
      id: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      id: 'phone',
    },
    {
      Header: 'Website',
      accessor: 'website',
      id: 'website',
    },
    {
      Header: 'Location',
      accessor: 'address',
      Cell: ({ value }) => <Location details={value} />,
      id: 'location'
    }
  ]), [])
  const usersData = useMemo(() => users, [users])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `https://fakerapi.it/api/v1/persons?_quantity=20`,
        });
        if (response?.data?.status === "OK") {
          console.debug(response?.data)
          setError(null)
          setUsers(response?.data?.data || []);
        } else {
          // TODO: Handle error
        }
      } catch (err) {
        console.error(err, err.stack);
        setError(err.message);
      }
      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
    columns,
    usersData,
    error,
  };
};

export default useUsers;
