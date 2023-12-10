import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCarbins';

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isLoading, cabins };
}
