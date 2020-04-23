import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Paper,
  Box,
  Button,
} from '@material-ui/core';
import { useStores } from '../../core/hooks/use-stores';
import { TitleBar } from '../../core/components/TitleBar';
import { CustomLink } from '../../core/components/CustomLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      flexGrow: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    filter: {
      // backdropFilter: 'blur(2px) brightness(0.7)',
      // position: 'absolute',
      // height: '100%',
      // width: '100%',
      // backgroundColor: ' rgba(255,255,255,0.4)',
    },
    box: {
      height: '100%',
    },
    title: {
      marginBottom: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    text: {
      color: theme.palette.text.primary,
    },
    button: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      zIndex: 5,
    },
    image: {
      height: 'auto',
      margin: '0 auto',
      display: 'block',
      marginBottom: theme.spacing(3),
    },
    content: {
      paddingTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
  })
);

export const Profile: React.FC = observer(() => {
  const classes = useStyles();
  const { authStore } = useStores();

  useEffect(() => {
    authStore.fetchUserData();
  }, [authStore]);

  return (
    <>
      <TitleBar title="User Profile" />
      <Box
        className={classes.root}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="flex"
      >
        <Container maxWidth="md" className={classes.content}>
          <Paper>
            <Box padding={2} marginBottom={2} fontWeight="300">
              <Typography variant="h6" className={classes.text}>
                Fullname : {authStore.user?.firstname}{' '}
                {authStore.user?.lastname}
              </Typography>
              <Typography variant="h6" className={classes.text}>
                E-mail : {authStore.user?.email}
              </Typography>
              <Typography variant="h6" className={classes.text}>
                Address : {authStore.user?.address}
              </Typography>
              <Typography variant="h6" className={classes.text}>
                National ID : {authStore.user?.national_id}
              </Typography>
              <Typography variant="h6" className={classes.text}>
                Phone: {authStore.user?.phone}
              </Typography>
            </Box>
          </Paper>
          <CustomLink to="/profile/edit">
            <Button color="primary" variant="contained">
              Edit Profile
            </Button>
          </CustomLink>
        </Container>
      </Box>
    </>
  );
});
