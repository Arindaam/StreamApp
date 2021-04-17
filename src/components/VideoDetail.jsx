import React, { useState } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { gapi } from 'gapi-script';

const VideoDetail = ({ video }) => {
  let Data = JSON.parse(sessionStorage.getItem('Data'));

  console.log(Data);
  function addVideo(event) {
    event.preventDefault();
    for (var i = 0; i < Data.length; i++) {
      if (String(Data[i].snippet.title) == String(event.target[0].value)) {
        console.log(Data[i].id);
        return gapi.client.youtube.playlistItems
          .insert({
            part: ['snippet'],
            resource: {
              snippet: {
                playlistId: String(Data[i].id),
                resourceId: {
                  videoId: String(video.id.videoId),
                  kind: 'youtube#video',
                },
              },
            },
          })
          .then(
            function (response) {
              // Handle the results here (response.result has the parsed body).
              console.log('Response', response);
              alert('Video added Successfully!');
            },
            function (err) {
              console.error('Execute error', err);
              alert('Error!');
            }
          );
      }
    }
    alert('Video Add Failed: Playlist doesnt exists!');

    // console.log("Video Added");
  }

  const [showMenu, setshowMenu] = useState(false);
  const [rating, setRating] = useState();
  const [commentsec, princomments] = useState();

  const getRating = async () => {
    await gapi.client.youtube.videos
      .getRating({
        id: String(video.id.videoId),
      })
      .then((res) => {
        console.log(res);
        setRating(res.result.items[0].rating);
      });
  };

  const Changerating = async () => {
    await gapi.client.youtube.videos.rate({
      id: String(video.id.videoId),
      rating: "Like"
    })
        .then(function(response) {
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

  const execute=async () => {
    await gapi.client.youtube.commentThreads.list({
        id: String(video.id.videoId)
    })
        .then((res) => {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", res);
                princomments(res.result.items);
              },
              function(err) { console.error("Execute error", err); });
  }

  if (!video) {
    return <div>Not Found</div>;
  }
  const videoSource = `https://www.youtube.com/embed/${video.id.videoId}`;

  console.log(Data);
  return (
    <React.Fragment>
      <Paper elevation={6} style={{ height: '75%' }}>
        <iframe
          frameBorder='0'
          height='100%'
          width='100%'
          src={videoSource}
          title='video'
          allowFullScreen
        />
      </Paper>
      <Paper elevation={6} style={{ padding: '15px' }}>
        <Typography variant='h5'>
          {video.snippet.title} - {video.snippet.channelTitle}
        </Typography>
        <Typography variant='subtitle1'>
        <a href={`https://www.youtube.com/channel/${video.snippet.channelId}`}> {video.snippet.channelTitle} </a>
        </Typography>
        <Button
          variant='outlined'
          style={{ margin: '10px' }}
          onClick={() => getRating()}
        >
          get rating
        </Button>
        <Button
          variant='outlined'
          style={{ margin: '10px' }}
          onClick={() => Changerating()}
        >
          Like
        </Button>
        <Typography variant='subtitle2'>{rating}</Typography>
        <Button
          variant='outlined'
          style={{ margin: '10px' }}
          onClick={() => execute()}
        >
          Comments
        </Button>
        <Typography variant='subtitle2'>{commentsec}</Typography>
        <Typography variant='subtitle2'>{video.snippet.description}</Typography>
        <Button
          onClick={function () {
            showMenu ? setshowMenu(false) : setshowMenu(true);
            console.log(showMenu);
          }}
        >
          +
        </Button>
      </Paper>

      {showMenu ? (
        <form action='#' onSubmit={addVideo}>
          <label>
            Playlist Name:
            <input type='text' name='title' />
          </label>
          <input type='submit' value='Submit' />
        </form>
      ) : null}
    </React.Fragment>
  );
};

export default VideoDetail;