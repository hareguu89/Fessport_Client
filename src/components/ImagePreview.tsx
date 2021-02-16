import React from 'react';
import styled from 'styled-components';

interface Props {
  url: string;
}

interface ImageProps {
  url: string;
}

const ImagePreview = ({ url }: Props) => {
  return (
    <DivContainer>
      <ImagePreviewImage url={url} />
    </DivContainer>
  );
};

const DivContainer = styled.div`
  padding: 10px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }
`;

const ImagePreviewImage = styled.div<ImageProps>`
  width: 300px;
  height: 300px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: black;
  background-image: url(${(props) => props.url});
`;

export default ImagePreview;
