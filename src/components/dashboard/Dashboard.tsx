import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const userEmail = 'khellstorm@gmail.com';
  const userId = 1;
  const listingId = 1;
  const userName = 'Kyle';
  const [randomListings, setRandomListings] = useState<any>([]);
  const [shownListing, setShownListing] = useState<any>([]);
  const [swapCount, setSwapCount] = useState(0);

  useEffect(() => {
    axios.get('/dashboardInfo', {
      params: {
        userId,
        listingId,
      },
    })
      .then((data) => {
        console.log('axios results back in');
        console.log(data);
      });
  });

  useEffect(() => {
    axios.get(`/user/email/${userEmail}`)
      .then(({ data }) => {
        const info: UserInfo = data;
        console.log(info, 'info');
        setUserName(info.first_name);
        setUserId(info.id);
        return info.id;
      })
      .then((id) => {
        axios.get(`/listing/user/${id}`)
          .then(({ data }) => {
            console.log(data, 'data');
          })
          .catch(() => console.log('no listing found for that user'));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      Dashboard Page (Where the user arrives after logging in)
      <h4>
        Hello,
        {' '}
        {userName}
      </h4>
      <div id="user-notifications">
        User notifications go here
      </div>
      <div id="random-listing">
        Wanna get away?
        {'There is a listing you might like from some <random_location>'}
        {' '}
        {'from <start_date> until <end_date>'}
      </div>
    </>
  );
};

export default Dashboard;
