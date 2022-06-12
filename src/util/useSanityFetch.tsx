import { useMemo } from 'react';
import useSWR from 'swr';
import sanityClient from '../constants/sanityClient';

const useSanityFetch = (
  query: string,
  {
    params = undefined,
    isOneResult = false,
  }: { params?: any; isOneResult?: boolean } = {},
) => {
  const { data, error } = useSWR([query, JSON.stringify(params)], url =>
    sanityClient.fetch(url, params),
  );
  const result = useMemo(
    () => (isOneResult ? data?.[0] : data),
    [data, isOneResult],
  );
  if (error) {
    console.error(error);
  }
  return useMemo(() => result, [result]);
};

export default useSanityFetch;
