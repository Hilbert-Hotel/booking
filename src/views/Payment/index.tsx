import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import moment from 'moment';
import { RoomAmountPair } from '../../core/stores/booking';
import { BackendAPI } from '../../core/repository/api/backend';
import { FormText } from '../../core/components/Forms/FormText';
import qrcode from 'qrcode';
import { ReservationStatusResponse } from '../../core/models/reservation';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    main: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    noLineHeight: {
      verticalAlign: 'middle',
    },
    qrImage: {
      marginTop: theme.spacing(2),
      width: 'min( 80%, 500px)',
      height: 'auto',
    },
    bold: {
      fontWeight: 'bold',
    },
    text: {
      color: theme.palette.text.primary,
    },
    button: {
      width: '100%',
      padding: theme.spacing(2),
    },
    priceText: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  })
);

export const Payment: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { authStore, themeStore } = useStores();
  const [reservationInfo, setReservationInfo] = useState<
    ReservationStatusResponse
  >();
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [qr, setQR] = useState<string>();
  useEffect(() => {
    if (id) {
      try {
        BackendAPI.reservationStatus(id).then(async res => {
          setReservationInfo(res.data);
          console.log(res.data);
          setQR(
            await qrcode.toDataURL('paymeplease', {
              errorCorrectionLevel: 'H',
              color: themeStore.dark
                ? {
                    dark: '#FFF', // Blue dots
                    light: '#0000', // Transparent background
                  }
                : {
                    dark: '#000', // Blue dots
                    light: '#0000', // Transparent background
                  },
            })
          );
        });
      } catch (error) {}
    }
  }, [id, themeStore.dark]);
  useEffect(() => {
    if (reservationInfo) {
      let timer: any;
      console.log('hi');
      const newTimer = () => {
        console.log('time is ticking');
        return setTimeout(async () => {
          const { data } = await BackendAPI.paymentStatus(reservationInfo.id);
          if (data.isPaid) {
            history.push('/complete/' + reservationInfo.id);
          }
          timer = newTimer();
        }, 1000);
      };
      timer = newTimer();
      return () => {
        console.log('time is ticking');
        clearTimeout(timer as any);
      };
    }
  }, [reservationInfo, history]);

  return (
    <>
      <TitleBar title="Payment" onBack={() => history.push('/search/result')} />
      <Container maxWidth="md" className={classes.root}>
        {qr && (
          <>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={qr}
                className={classes.qrImage}
                alt={'qr for' + reservationInfo?.id}
              />
            </Box>
            <Typography variant="body1" gutterBottom className={classes.text}>
              Scan QR code to pay
            </Typography>
            <Typography variant="h4" className={classes.priceText}>
              {reservationInfo?.rooms.reduce((p, r) => p + r.price * r.beds, 0)}{' '}
              <small>THB (tax included)</small>
            </Typography>
          </>
        )}
      </Container>
    </>
  );
});
