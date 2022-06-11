import { FC, useMemo } from 'react';
import sanityClient from '../sanityClient';
import BlockContent from '@sanity/block-content-to-react';
import useSanityFetch from '../util/useSanityFetch';
import LoadingSignal from './LoadingSignal';
import getUrlFor from '../util/getUrlFor';

const Page: FC = () => {
  const sanityConfig = useMemo(() => sanityClient.config(), []);
  const pageData = useSanityFetch(
    `*[_type == "landingPage"]{
      mainImage {
        asset-> {
          _id,
          url
        }
      },
      content
    }`,
    { isOneResult: true },
  );

  return (
    <div className='flex flex-row flex-wrap max-w-full gap-4'>
      {pageData ? (
        <>
          <img
            src={getUrlFor(pageData.mainImage).width(500).url()}
            className='object-cover h-fit'
            alt='Field with tents at the event'
          />
          <div className='max-w-lg pb-8 xl:max-w-2xl'>
            <BlockContent
              className='block-content'
              blocks={pageData.content}
              projectId={sanityConfig.projectId}
              dataset={sanityConfig.dataset}
            />
          </div>
        </>
      ) : (
        <LoadingSignal />
      )}
    </div>
  );
};

export default Page;
