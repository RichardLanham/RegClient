import React from "react";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

function HideOnScroll(props) {
  const { children, window, scroll = true } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  if (!scroll) {
    return <div>{children}</div>;
  }
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default HideOnScroll;
