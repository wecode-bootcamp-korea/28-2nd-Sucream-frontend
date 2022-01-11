import useSWR from 'swr';
import { useParams } from 'react-router-dom';

const fetcher = async url => await fetch(url).then(res => res.json());

const useSizeDetail = () => {
  const params = useParams();
  const { data: sizeData, error: sizeError } = useSWR(
    `http://10.58.5.73:8000/biddings?product=${params.id}`,
    fetcher
  );

  return { sizeData, sizeError };
};

export default useSizeDetail;
