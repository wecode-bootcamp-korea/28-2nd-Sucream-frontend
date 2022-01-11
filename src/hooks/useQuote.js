import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = async url => await fetch(url).then(res => res.json());

const useSizeQuote = () => {
  const params = useParams();
  const { data: quoteData, error: quoteError } = useSWR(
    `http://10.58.5.73:8000/products/${params.id}/graph`,
    // `http://localhost:3000/data/productQuote.json`,
    fetcher
  );

  return { quoteData, quoteError };
};

export default useSizeQuote;
