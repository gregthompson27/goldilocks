import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import axios from 'axios';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Rating } from '@material-ui/lab';
import { AppInterface } from 'goldilocksTypes';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const hLabels: { [index: string]: string } = {
  0.5: 'Really Terrible',
  1: 'Terrible',
  1.5: 'Really Bad',
  2: 'Bad',
  2.5: 'Below average',
  3: 'Average',
  3.5: 'Good',
  4: 'Really Good',
  4.5: 'Excellent',
  5: 'Above and beyond',
};
const gLabels: { [index: string]: string } = {
  0.5: 'Really Terrible',
  1: 'Terrible',
  1.5: 'Really Bad',
  2: 'Bad',
  2.5: 'Below average',
  3: 'Average',
  3.5: 'Good',
  4: 'Really Good',
  4.5: 'Excellent',
  5: 'Above and beyond',
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
}));

const WriteAReview: React.FC<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [hostRating, setHostRating] = useState<number | null>(3);
  const [guestRating, setGuestRating] = useState<number | null>(3);
  const [hHover, setHostHover] = useState<number>(-1);
  const [gHover, setGuestHover] = useState<number>(-1);
  const [hostReview, setHReview] = useState<string>('Enter review here');
  const [guestReview, setGReview] = useState<string>('Enter review here');
  const [isComplete, setIsComplete] = useState<boolean>(true);
  // const { user } = props;
  // console.info('this is the user', user, user.id);

  const handleHostReview = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    setHReview(e.target.value);
  };

  const handleGuestReview = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    setGReview(e.target.value);
  };

  const submitReview = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // TODO: ratingValue will the value I want to set to the DB for the host rating
    e.preventDefault();
    const params = {
      guestRating,
      hostRating,
      hostReview,
      guestReview,
      isComplete,
      userId: user.id,
    };

    axios.post('reviews/newReview', { params })
      .then((result) => console.info(result))
      .catch((err) => console.warn(err.message));
  };

  return (
    <Grid container className={classes.main} spacing={2} direction="row" alignItems="center" justify="center" item xs={9}>
      <Typography variant="h3" align="center">Tell us about your swap.</Typography>
      <Grid item xs={9} justify="center" alignItems="center">
        <Typography component="legend">How would you rate your swapmate as a host?</Typography>
        <StyledRating
          name="host-rating"
          defaultValue={3}
          value={hostRating}
          precision={0.5}
          icon={<FavoriteIcon fontSize="large" />}
          onChange={(event, newValue) => {
            setHostRating(newValue);
            console.info('hostRating', newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHostHover(newHover);
            console.info('hover', newHover);
          }}
        />
        {hostRating !== null && <Box ml={2}>{hLabels[hHover !== -1 ? hHover : hostRating]}</Box>}
        <br />
        <Typography component="legend">Comments?</Typography>
        <br />
        <TextField
          name="host-review"
          autoFocus
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          onChange={(e) => handleHostReview(e, hostReview)}
        />
        <br />
        <Typography component="legend">How would you rate your swapmate as a guest?</Typography>
        <StyledRating
          name="guest-rating"
          defaultValue={3}
          value={guestRating}
          precision={0.5}
          icon={<FavoriteIcon fontSize="large" />}
          onChange={(event, newValue) => {
            setGuestRating(newValue);
            console.info('guestRating', newValue);
          }}
          onChangeActive={(event, hover) => {
            setGuestHover(hover);
            console.info('hover', hover);
          }}
        />
        {guestRating !== null && <Box ml={2}>{gLabels[gHover !== -1 ? gHover : guestRating]}</Box>}
        <br />
        <Typography component="legend">Comments?</Typography>
        <br />
        <TextField
          name="guest-review"
          autoFocus
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          onChange={(e) => handleGuestReview(e, guestReview)}
        />
        <br />
        <Button
          variant="outlined"
          color="secondary"
          onClick={submitReview}
        >
          Submit Review
        </Button>
      </Grid>
    </Grid>
  );
};

export default WriteAReview;
