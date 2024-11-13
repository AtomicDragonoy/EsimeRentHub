const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string, method: string = 'GET', data: any = null) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'An error occurred');
  }

  return json;
}

export const api = {
  login: (email: string, password: string) => fetchAPI('/users/login', 'POST', { email, password }),
  getProperties: (queryString: string = '') => fetchAPI(`/properties?${queryString}`),
  register: (userData: any) => fetchAPI('/users/register', 'POST', userData),
  getProfile: () => fetchAPI('/users/profile'),
  updateProfile: (userData: any) => fetchAPI('/users/profile', 'PUT', userData),
  getProperties: (queryString: string = '') => fetchAPI(`/properties?${queryString}`),
  getProperty: (id: string) => fetchAPI(`/properties/${id}`),
  getPropertyReviews: (propertyId: string) => fetchAPI(`/properties/${propertyId}/reviews`),
  createReview: (propertyId: string, reviewData: { rating: number; comment: string }) =>
    fetchAPI(`/properties/${propertyId}/reviews`, 'POST', reviewData),
  getFavorites: () => fetchAPI('/favorites'),
  addFavorite: (propertyId: string) => fetchAPI('/favorites', 'POST', { propertyId }),
  removeFavorite: (propertyId: string) => fetchAPI(`/favorites/${propertyId}`, 'DELETE'),
  createProperty: (propertyData: any) => fetchAPI('/properties', 'POST', propertyData),
  updateProperty: (id: string, propertyData: any) => fetchAPI(`/properties/${id}`, 'PUT', propertyData),
  deleteProperty: (id: string) => fetchAPI(`/properties/${id}`, 'DELETE'),
};