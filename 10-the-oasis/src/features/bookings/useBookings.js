import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status') || 'all';
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = { field, direction };

  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    const nextPage = page + 1;

    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, nextPage],
      queryFn: () => getBookings({ filter, sortBy, page: nextPage }),
    });
  }

  if (page > 1) {
    const prevPage = page - 1;

    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, prevPage],
      queryFn: () => getBookings({ filter, sortBy, page: prevPage }),
    });
  }
  return { isLoading, bookings, count };
}
