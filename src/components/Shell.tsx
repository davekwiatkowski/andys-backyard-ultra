import { FC, ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import sanityClient from '../sanityClient';

const Shell: FC<{ children?: ReactNode }> = ({ children }) => {
  const [allPagesData, setAllPagesData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page"] {
          title,
          slug
        }`,
      )
      .then(data => setAllPagesData(data))
      .catch(console.error);
  }, []);

  if (!allPagesData) return <div>Loading...</div>;

  return (
    <div className='min-h-screen p-8 font-serif h-fit bg-rose-50 xl:p-14'>
      <nav className='flex flex-row gap-4 p-4'>
        <Link to='/' className='text-lg font-bold no-underline'>
          Andy's Backyard Ultra
        </Link>
        {allPagesData.map((page: any) => (
          <Link
            className={`${
              location.pathname.substring(1) === page.slug.current
                ? 'underline'
                : 'no-underline'
            } text-lg`}
            to={`/${page.slug.current}`}
            key={page.slug.current}>
            {page.title}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
};

export default Shell;
