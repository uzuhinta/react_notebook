import React from 'react';
import Button from '../../ui/Button';
import { useFetcher, useNavigation } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(isSubmitting);
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" disabled={isSubmitting}>
        Make priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
