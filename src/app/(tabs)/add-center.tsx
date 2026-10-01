import { Redirect } from 'expo-router';

/**
 * Placeholder route for the centre "+" tab button (which is rendered by the tab layout).
 * If it's ever reached directly (deep link), send the user to the new-assignment form.
 */
export default function AddCenter() {
  return <Redirect href="/assignment/new" />;
}
