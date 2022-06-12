import { FC, ReactNode, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSanityFetch from '../util/useSanityFetch';
import LoadingSignal from './LoadingSignal';

const Shell: FC<{ children?: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const currentPath = useMemo(
    () => location.pathname.substring(1),
    [location.pathname],
  );
  const allPagesData = useSanityFetch(
    `*[_type == "page"] {
      title,
      slug,
      isLandingPage
    }`,
  );

  return (
    <div className='font-serif'>
      <nav
        className={`fixed top-0 left-0 z-50 flex min-h-[72px] w-full justify-center p-6 px-8 align-middle md:bg-red-50 md:shadow-sm ${
          isExpanded ? 'bg-red-100 shadow-lg' : 'bg-red-50 shadow-sm'
        }`}>
        <div className='flex w-full max-w-[1080px] flex-row flex-wrap justify-between'>
          {allPagesData ? (
            <>
              <div className='flex items-center flex-shrink-0 mr-6'>
                <Link
                  to='/'
                  className='text-base font-semibold tracking-tight sm:text-xl'
                  onClick={() => {
                    setIsExpanded(false);
                  }}>
                  {
                    allPagesData.filter((page: any) => page.isLandingPage)[0]
                      .title
                  }
                </Link>
                {currentPath && (
                  <span className='text-xs italic text-gray-500 capitalize sm:text-sm md:hidden'>
                    <span className='pl-2 pr-2'>{'>'}</span>
                    <span>{currentPath}</span>
                  </span>
                )}
              </div>
              <div className='block md:hidden'>
                <button
                  className='flex items-center px-3 py-2 text-black border border-black hover:border-black hover:bg-black hover:text-white'
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                  }}>
                  <svg
                    className='w-3 h-3 fill-current'
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
                  {allPagesData
                    .filter((page: any) => !page.isLandingPage)
                    .sort((a: any, b: any) => a.title.localeCompare(b.title))
                    .map((page: any) => (
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
            </>
          ) : (
            <LoadingSignal />
          )}
        </div>
      </nav>
      <div className='absolute top-[72px] h-fit w-full'>{children}</div>
    </div>
  );
};

export default Shell;
