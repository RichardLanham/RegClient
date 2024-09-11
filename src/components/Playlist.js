import { useState, useEffect, useRef } from "react";
import { useTheme, createTheme, styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";

const Playlist = (props) => {
  const showPlayer = props.showPlayer;
  const videos = props.play;
  const theme = useTheme();

  const mytheme = createTheme({
    palette: {
      primary: {
        main: "#567658",
      },
      secondary: {
        main: "#520186",
      },
    },
  });

  useEffect(() => {
    if (!showPlayer) {
      load(videos[0].url, videos[0].label);
    }
  }, [showPlayer]);

  const [state, setState] = useState({
    url: videos[0].url,
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  });
  const load = (url, label, loaded) => {
    if (label === "Playlist...") {
      handleStop();
      return;
    }
    if (loaded) {
      return;
    }
    setStopLabel(label);
    setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  const [listVal, setListVal] = useState("Playlist...");
  const [stopLabel, setStopLabel] = useState("");

  const handleChangeTrack = (event) => {
    event.stopPropagation();
    setListVal(event.target.value);
  };

  useEffect(() => {
    load(videos[0].url, videos[0].label);
    return () => {
      load(videos[0].url, videos[0].label);
    };
  }, []);

  const handlePlayPause = () => {
    setState({ playing: !state.playing });
  };

  const handleStop = () => {
    setListVal("Playlist...");
    setState({ url: null, playing: false });
  };

  const handleToggleControls = () => {
    const url = state.url;
    setState(
      {
        controls: !state.controls,
        url: null,
      },
      () => load(url)
    );
  };

  const handleToggleLight = () => {
    setState({ light: !state.light });
  };

  const handleToggleLoop = () => {
    setState({ loop: !state.loop });
  };

  const handleVolumeChange = (e) => {
    setState({ volume: parseFloat(e.target.value) });
  };

  const handleToggleMuted = () => {
    setState({ muted: !state.muted });
  };

  const handleSetPlaybackRate = (e) => {
    setState({ playbackRate: parseFloat(e.target.value) });
  };

  const handleOnPlaybackRateChange = (speed) => {
    setState({ playbackRate: parseFloat(speed) });
  };

  const handleTogglePIP = () => {
    setState({ pip: !state.pip });
  };

  const handlePlay = () => {
    console.log("onPlay");
  };

  const handleEnablePIP = () => {
    console.log("onEnablePIP");
    setState({ pip: true });
  };

  const handleDisablePIP = () => {
    console.log("onDisablePIP");
    setState({ pip: false });
  };

  const handlePause = () => {
    console.log("onPause");
    setState({ playing: false });
  };

  const handleSeekMouseDown = (e) => {
    setState({ seeking: true });
  };

  const handleSeekChange = (e) => {
    setState({ played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setState({ seeking: false });
  };

  const handleProgress = (state) => {
    if (!state.seeking) {
    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    setState({ playing: state.loop });
  };

  const handleDuration = (duration) => {};

  const handleClickFullscreen = () => {};

  const playerRef = useRef();

  const StyledButton = styled(Button)(({ theme }) => ({
    width: "fit-content",
    justifyContent: "left",
    padding: 1,
    margin: 1,
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.caption,
    },
  }));

  const renderLoadButton = (url, label, key) => {
    return (
      <StyledButton
        variant="outlined"
        key={key}
        onClick={() => load(url, label, label === stopLabel)}
        style={{
          margin: 3,
          padding: 2,
          textTransform: "lowercase",
          backgroundColor:
            label === stopLabel
              ? mytheme.palette.primary.main
              : mytheme.palette.background.default,
          color:
            label === stopLabel
              ? mytheme.palette.primary.contrastText
              : mytheme.palette.info.dark,
        }}
      >
        {label}
      </StyledButton>
    );
  };

  const StyledVideoButtonGroup = styled("div")(({ theme }) => ({
    gap: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 400,
    margin: "auto",

    overFlowX: "scroll",
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  }));

  const StyledPlayerWrap = styled("div")(({ theme }) => ({
    position: "relative",
    width: 400,
    height: 225,
    margin: "auto",
    border: "1px solid black",
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      width: state.url === null ? 100 : 300,
      height: state.url === null ? 100 : 170,
    },
  }));

  return (
    <div>
      <div
        style={{
          ...theme.flexRows,
        }}
      >
        <StyledVideoButtonGroup>
          {videos.map((item, key) => {
            return renderLoadButton(item.url, item.label, key);
          })}
        </StyledVideoButtonGroup>
        <StyledPlayerWrap>
          <div
            style={{
              ...theme.typography.h4,
              position: "absolute",

              left: "30%",
              top: "30%",
            }}
          >
            {}
          </div>
          <ReactPlayer
            controls={true}
            width="100%"
            height="100%"
            url={state.url}
          />
          {}
        </StyledPlayerWrap>
        <div>
          <span
            style={{
              ...theme.typography.caption,
            }}
          >
            {}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
