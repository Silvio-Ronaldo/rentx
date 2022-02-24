import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles';

interface ImageSliderProps {
  imageUrls: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const { index } = info.viewableItems[0];
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imageUrls.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imageUrls}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{
                uri: item,
              }}
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
