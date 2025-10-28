import { RestaurantDashboard } from './RestaurantDashboard'

interface PageProps {
  params: { id: string }
}

export default function RestaurantPage({ params }: PageProps) {
  const { id } = params

  return <RestaurantDashboard restaurantId={id} />
}