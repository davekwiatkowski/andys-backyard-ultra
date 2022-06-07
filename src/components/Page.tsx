import { FC, useEffect, useMemo, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../sanityClient';
import { useParams } from 'react-router-dom';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

const Page: FC = () => {
  const [pageData, setPageData] = useState<any>(null);
  const { slug } = useParams();
  const sanityConfig = useMemo(() => sanityClient.config(), []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == $slug]{
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
        { slug },
      )
      .then(data => setPageData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div className='flex max-w-full flex-row flex-wrap gap-4'>
      <img
        src={urlFor(pageData.mainImage).width(500).url()}
        className='h-fit object-cover'
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
    </div>
  );
};

export default Page;
