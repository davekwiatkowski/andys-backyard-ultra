import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';

const sanityImageUrlBuilder = imageUrlBuilder(sanityClient);

export default sanityImageUrlBuilder;
