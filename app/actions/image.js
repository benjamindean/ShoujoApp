export const ADD_IMAGE = 'ADD_IMAGE';

export function addImage(image) {
  return {
    type: ADD_IMAGE,
    image: image
  };
}
