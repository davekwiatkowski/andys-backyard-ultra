import { sanityImageUrlBuilder } from '../constants/sanityConstants';

const getUrlFor = (sanitySource: string) => {
  return sanityImageUrlBuilder.image(sanitySource);
};

export default getUrlFor;
