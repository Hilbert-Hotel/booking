import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      height: '100%',
      flexGrow: 1,
    },
    box: {
      height: '100%',
    },
    title: {
      marginBottom: theme.spacing(6),
    },
    button: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
);

export const Home: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      className={classes.root}
      flexDirection="column"
      justifyContent="center"
      display="flex"
    >
      <Container maxWidth="xs">
        <Box flexDirection="column" justifyContent="center" display="flex">
          <Typography variant="h4" gutterBottom className={classes.title}>
            Welcome to Hilbert Hostel Management System
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push('/search')}
            className={classes.button}
          >
            Booking
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled
            onClick={() => history.push('/search')}
            className={classes.button}
          >
            Get QR Code key
          </Button>
        </Box>
      </Container>
    </Box>
  );
});
