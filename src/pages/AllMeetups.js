import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [meetups, setMeetups] = useState();

  useEffect(() => {
    fetch('https://react-restjs-course-default-rtdb.firebaseio.com/meetups.json', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }

        setMeetups(meetups);
        setIsLoading(false);
      });
  }, []);

  return (
    <section>
      <h1>All Meetups</h1>
      {isLoading ? <div>Loading...</div> : <MeetupList meetups={meetups} />}
    </section>
  );
}

export default AllMeetupsPage;
