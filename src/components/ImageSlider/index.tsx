import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface ImageSliderProps {
  imageUrls: string[];
}

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage
          source={{
            uri: imageUrls[0],
          }}
          resizeMode="contain"
        />
      </CarImageWrapper>
    </Container>
  );
}
