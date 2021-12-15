import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

const Wrapper = styled.div`
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

interface YouTubeEmbedProps {
  embedId: string;
}

function YoutubeEmbed(props: YouTubeEmbedProps) {
  return (
    <Wrapper>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        height="315"
        frameBorder="0"
        src={`https://www.youtube.com/embed/${props.embedId}`}
        title="Embedded YouTube"
        width="560"
      />
    </Wrapper>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
