import { FC, useMemo } from 'react';
import sanityClient from '../constants/sanityClient';
import { useParams } from 'react-router-dom';
import BlockContent from '@sanity/block-content-to-react';
import useSanityFetch from '../util/useSanityFetch';
import LoadingSignal from './LoadingSignal';
import getUrlFor from '../util/getUrlFor';

const Page: FC<{ isLandingPage?: boolean }> = ({ isLandingPage }) => {
  const { slug } = useParams();
  const sanityConfig = useMemo(() => sanityClient.config(), []);
  const pageData = useSanityFetch(
    `*[_type == "page" && ${
      isLandingPage ? 'isLandingPage == true' : 'slug.current == $slug'
    }]{
      title,
      slug,
      mainImage {
        asset-> {
          _id,
          url
        }
      },
      content
    }`,
    {
      params: {
        ...(slug ? { slug } : {}),
        ...(isLandingPage ? { isLandingPage } : {}),
      },
      isOneResult: true,
    },
  );

  return (
    <div className='flex flex-row justify-center w-full px-8 align-middle'>
      <div className='w-full max-w-[1080px]'>
        {pageData ? (
          <>
            <div className='relative'>
              <img
                src={getUrlFor(pageData.mainImage).width(1080).url()}
                className='h-[300px] w-full max-w-[1080px] object-cover md:h-[600px]'
                alt={pageData.title}
              />
              <h1 className='absolute left-0 mb-0 mr-8 text-5xl italic border-b-8 bottom-8 border-red-50 font-extralight text-red-50 md:mr-16'>
                {pageData.title}
              </h1>
            </div>
            <BlockContent
              className='max-w-full pt-8 pb-8 block-content'
              blocks={pageData.content}
              projectId={sanityConfig.projectId}
              dataset={sanityConfig.dataset}
            />
          </>
        ) : (
          <LoadingSignal className='pt-2' />
        )}
      </div>
    </div>
  );
};

export default Page;
