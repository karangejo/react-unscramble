import React from "react";
import styled from "styled-components";

const ResponsiveImageDiv = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const ResponsiveImageImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function ResponsiveImage({ src, width, height }) {
  return (
    <ResponsiveImageDiv
      style={{
        width,
      }}
    >
      <div
        style={{
          paddingBottom: (height / width) * 100 + "%",
        }}
      />
      <ResponsiveImageImg src={src} alt="button for game" />
    </ResponsiveImageDiv>
  );
}

export default ResponsiveImage;
