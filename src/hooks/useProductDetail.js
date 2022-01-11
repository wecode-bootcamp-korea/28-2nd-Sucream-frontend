import useSWR from 'swr';
import { useParams } from 'react-router-dom';

const fetcher = async url => await fetch(url).then(res => res.json());

const useProductDetail = () => {
  const params = useParams();
  const { data: productData, error: productError } = useSWR(
    `http://10.58.5.73:8000/products/${params.id}`,
    fetcher
  );

  return { productData, productError };
};

export default useProductDetail;
