import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import sanityClient from '../sanityClient';

const Shell: FC<{ children?: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [allPagesData, setAllPagesData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const currentPath = useMemo(
    () => location.pathname.substring(1),
    [location.pathname],
  );

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
    <div className='font-serif'>
      <nav
        className={`fixed z-50 flex min-h-[72px] w-full flex-wrap items-center justify-between p-6 md:bg-red-50 md:shadow-sm ${
          isExpanded ? 'bg-red-100 shadow-lg' : 'bg-red-50 shadow-sm'
        }`}>
        <div className='mr-6 flex flex-shrink-0 items-center'>
          <Link
            to='/'
            className='text-xl font-semibold tracking-tight'
            onClick={() => {
              setIsExpanded(false);
            }}>
            Andy's Backyard Ultra
          </Link>
          {currentPath && (
            <span className='text-xs capitalize italic text-gray-500 md:hidden'>
              <span className='pl-2 pr-2'>{'>'}</span>
              <span>{currentPath}</span>
            </span>
          )}
        </div>
        <div className='block md:hidden'>
          <button
            className='flex items-center border border-black px-3 py-2 text-black hover:border-black hover:bg-black hover:text-white'
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}>
            <svg
              className='h-3 w-3 fill-current'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>
        <div
          className={`block w-full flex-grow ${
            isExpanded ? 'visible' : 'hidden'
          } md:visible md:flex md:w-auto md:items-center`}>
          <div className='md:flex-grow'>
            {allPagesData.map((page: any) => (
              <Link
                onClick={() => {
                  setIsExpanded(false);
                }}
                className={`mt-4 mr-4 block text-gray-500 hover:text-black md:mt-0 md:inline-block ${
                  currentPath === page.slug.current
                    ? 'underline'
                    : 'no-underline'
                }`}
                to={`/${page.slug.current}`}
                key={page.slug.current}>
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className='absolute top-[72px] h-fit min-h-screen w-full p-8 xl:p-14'>
        {children}
      </div>
    </div>
  );
};

export default Shell;
