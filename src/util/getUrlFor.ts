import sanityImageUrlBuilder from '../constants/sanityImageUrlBuilder';

const getUrlFor = (sanitySource: string) => {
  return sanityImageUrlBuilder.image(sanitySource);
};

export default getUrlFor;
