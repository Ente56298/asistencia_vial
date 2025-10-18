import { LocationCoords, FavoriteRoute } from '../types';

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const DIRECTIONS_API_BASE = 'https://api.mapbox.com/directions/v5/mapbox/driving';

export interface RouteResponse {
    geometry: any;
    duration: number; // in seconds
    distance: number; // in meters
}

/**
 * Fetches an optimized route from the Mapbox Directions API.
 * @param stops An array of coordinates. The first is origin, last is destination, intermediates are waypoints.
 * @returns A promise that resolves to the route geometry, duration, and distance.
 */
export const getRoute = async (stops: LocationCoords[]): Promise<RouteResponse | null> => {
    if (stops.length < 2 || !MAPBOX_TOKEN) {
        return null;
    }

    const coordinates = stops.map(stop => `${stop.lon},${stop.lat}`).join(';');
    const url = `${DIRECTIONS_API_BASE}/${coordinates}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch route');
        }
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            return {
                geometry: route.geometry,
                duration: route.duration,
                distance: route.distance,
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching route from Mapbox:', error);
        throw error;
    }
};

const FAVORITES_KEY = 'favoriteRoutes';

/**
 * Retrieves saved favorite routes from localStorage.
 * @returns An array of FavoriteRoute objects.
 */
export const getFavoriteRoutes = (): FavoriteRoute[] => {
    try {
        const savedRoutes = localStorage.getItem(FAVORITES_KEY);
        return savedRoutes ? JSON.parse(savedRoutes) : [];
    } catch (error) {
        console.error('Error parsing favorite routes from localStorage:', error);
        return [];
    }
};

/**
 * Saves a new favorite route to localStorage.
 * @param route The FavoriteRoute object to save.
 */
export const saveFavoriteRoute = (route: Omit<FavoriteRoute, 'id'>): FavoriteRoute => {
    const favorites = getFavoriteRoutes();
    const newFavorite: FavoriteRoute = {
        ...route,
        id: `route_${Date.now()}`,
    };
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return newFavorite;
};

/**
 * Deletes a favorite route from localStorage by its ID.
 * @param routeId The ID of the route to delete.
 */
export const deleteFavoriteRoute = (routeId: string): void => {
    let favorites = getFavoriteRoutes();
    favorites = favorites.filter(r => r.id !== routeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
