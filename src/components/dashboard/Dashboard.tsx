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
  const [pendingRequestCount, setPendingRequestCount] = useState(0);

  const getDashboardInfo = () => {
    axios.get('/dashboardInfo', {
      params: {
        userId,
        listingId,
      },
    })
      .then((results) => {
        const { data } = results;
        setSwapCount(data.confirmedSwapCount);
        setPendingRequestCount(data.pendingRequests.count);
        setRandomListings(data.openAvailabilities);
        console.log('swapCount:', swapCount);
        console.log('request count:', pendingRequestCount);
        console.log('random listings:', randomListings);
      });
  };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <>
      <h4>
        Hello,
        {' '}
        {userName}
      </h4>
      <div id="user-notifications">
        User notifications go here
      </div>
      <div id="random-listing">
        <p>Wanna get away?</p>
        <p>
          There are
          {' '}
          {randomListings.length}
          {' '}
          open places. Here is one of them:
        </p>
        {'There is a listing you might like from some <random_location>'}
        {' '}
        {'from <start_date> until <end_date>'}
      </div>
    </>
  );
};

export default Dashboard;
