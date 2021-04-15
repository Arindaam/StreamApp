import React,{useState} from "react";
import { Paper, Typography ,Button} from "@material-ui/core";
import {gapi} from 'gapi-script'


    
const VideoDetail = ({ video }) => {
  
  let Data=JSON.parse(sessionStorage.getItem("Data"));

console.log(Data);
function addVideo(event)
{

  event.preventDefault();
  for(var i=0;i<Data.length;i++)
  {
    if(String(Data[i].snippet.title)==String(event.target[0].value))
    {
      console.log(Data[i].id);
      return gapi.client.youtube.playlistItems.insert({
        "part": [
          "snippet"
        ],
        "resource": {
          "snippet": {
            "playlistId": String(Data[i].id),
            "resourceId": {
              "videoId": String(video.id.videoId),
              "kind": "youtube#video"
            }
          }
        }
      })
          .then(function(response) {
                  // Handle the results here (response.result has the parsed body).
                  console.log("Response", response);
                  alert("Video added Successfully!")
                },
                function(err) { console.error("Execute error", err); })
    }
  }
  console.log("Video Added");
  
}
  

  const [showMenu,setshowMenu]=useState(false);
  
  if (!video) {
    return <div></div>;
  }
  const videoSource = `https://www.youtube.com/embed/${video.id.videoId}`;
  
  console.log(Data);
  return (
    <React.Fragment>
      <Paper elevation={6} style={{ height: "75%" }}>
        <iframe
          frameBorder="0"
          height="100%"
          width="100%"
          src={videoSource}
          title="video"
          allowFullScreen
        />
      </Paper>
      <Paper elevation={6} style={{ padding: "15px" }}>
        <Typography variant="h5">
          {video.snippet.title} - {video.snippet.channelTitle}
        </Typography>
        <Typography variant="subtitle1">
          {video.snippet.channelTitle}
        </Typography>
        <Typography variant="subtitle2">{video.snippet.description}</Typography>
        <Button onClick={function(){showMenu?setshowMenu(false):setshowMenu(true);console.log(showMenu);}}>+</Button>

        
      </Paper>

      { 
          showMenu
            ?         (
              <form action="#" onSubmit={addVideo}>
                <label>
                Playlist Name:
                <input type="text" name="title"  />
              </label>
              <input type="submit" value="Submit" />
            </form>
                      )
            : (
              null
            )
        }
      
    </React.Fragment>

    
  );
};

export default VideoDetail;
