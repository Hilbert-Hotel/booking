import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LoginIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import NotificationIcon from '@material-ui/icons/Notifications';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useStores } from '../../hooks/use-stores';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: '0',
      width: '100vw',
    },
  })
);

export const BottomNav: React.FC<BottomNavProps> = observer(({}) => {
  const classes = useStyles();
  const route = useRouteMatch();
  const history = useHistory();
  const { authStore } = useStores();
  return (
    <BottomNavigation value={route.path} className={classes.root}>
      <BottomNavigationAction
        value="/"
        onClick={() => history.push('/')}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        value="/search"
        onClick={() => history.push('/search')}
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        value="/notification"
        onClick={() => history.push('/notification')}
        icon={<NotificationIcon />}
      />
      {authStore.isAuthenticated ? (
        <BottomNavigationAction
          value="/profile"
          onClick={() => history.push('/profile')}
          icon={<PersonIcon />}
        />
      ) : (
        <BottomNavigationAction
          value="/login"
          onClick={() => history.push('/login')}
          icon={<LoginIcon />}
        />
      )}
    </BottomNavigation>
  );
});

export interface BottomNavProps {}
