import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Style = ({ photos, click }) => {
  const [selected, setSelected] = useState(0);
  return photos.map((photo, i) => {
    return (
      <StyleParent
        onClick={(e) => {
          click(photo.style_id);
          setSelected(i);
        }}
        key={i}
        className={selected === i ? "selected" : "not_selected"}
      >
        <img
          className="thumbnail"
          src={photo.photo.thumbnail_url}
          width="75px"
        />
      </StyleParent>
    );
  });
};

export default Style;

const StyleParent = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 90%;
  padding: 5px;
  height: 75px;
  overflow: hidden;
`;
