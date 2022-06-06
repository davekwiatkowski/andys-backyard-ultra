import { FC, useEffect, useMemo, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../sanityClient';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

const Page: FC = () => {
  const [pageData, setPageData] = useState<any>(null);
  const sanityConfig = useMemo(() => sanityClient.config(), []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "landingPage"]{
          mainImage {
            asset-> {
              _id,
              url
            }
          },
          content
        }`,
      )
      .then(data => setPageData(data[0]))
      .catch(console.error);
  }, []);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div className='flex flex-row flex-wrap max-w-full gap-4'>
      <img
        src={urlFor(pageData.mainImage).width(500).url()}
        className='object-cover h-fit'
        alt='Field with tents at the event'
      />
      <div className='max-w-lg pt-8 pb-8 pl-4 border-l border-rose-200 xl:max-w-2xl'>
        <BlockContent
          blocks={pageData.content}
          projectId={sanityConfig.projectId}
          dataset={sanityConfig.dataset}
        />
      </div>
    </div>
  );
};

export default Page;
