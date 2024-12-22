import { Grid, Button, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import styles from './styles';
import { AuthContext } from '@/libs/providers/GlobalProvider';
import { setLoading } from '@/libs/redux/slices/authSlice';
import { auth, firestore } from '@/libs/redux/store';
import fetchUserData from '@/libs/redux/thunks/user';
import ROUTES from '@/libs/constants/routes';
import ALERT_COLORS from '@/libs/constants/notification';

/**
 * Handles Google authentication and renders the Google authentication button.
 *
 * @return {JSX.Element} The Google authentication button JSX.
 */
const AuthGoogle = () => {
  const { handleOpenSnackBar } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(auth, provider);
      const user = userCred.user;

      dispatch(setLoading(true));
      const userData = await dispatch(
        fetchUserData({ firestore, id: user.uid })
      ).unwrap();

      if (userData?.needsBoarding) {
        router.replace(ROUTES.ONBOARDING);
      } else {
        router.replace(ROUTES.HOME);
      }
    } catch (error) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <Grid {...styles.googleAuthGridProps}>
      <Button
        {...styles.externalAuthButtonConfig}
        startIcon={<GoogleIcon />}
        onClick={handleGoogleAuth}
      >
      </Button>
      <Typography {...styles.googleAuthDisclaimerProps}>
        By continuing, you agree to the Terms of Service and Privacy Policy.
      </Typography>
    </Grid>
  );
};

export default AuthGoogle;
