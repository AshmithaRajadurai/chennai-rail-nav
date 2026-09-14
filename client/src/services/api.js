import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all railway stations
 */
export const fetchStations = async () => {
  const response = await api.get('/api/stations');
  return response.data.data;
};

/**
 * Fetch details, nodes, and edges for a specific station
 * @param {string} stationId (e.g. 'MAS', 'MS', 'TBM')
 */
export const fetchStationDetails = async (stationId) => {
  const response = await api.get(`/api/stations/${stationId}`);
  return response.data.data;
};

/**
 * Calculate shortest or accessible route between two station nodes
 * @param {Object} params { stationId, startNodeId, endNodeId, requireAccessible }
 */
export const calculateRoute = async ({ stationId, startNodeId, endNodeId, requireAccessible }) => {
  const response = await api.post('/api/routes/navigate', {
    stationId,
    startNodeId,
    endNodeId,
    requireAccessible: Boolean(requireAccessible),
  });
  return response.data.data;
};

/**
 * Toggle operational status of a facility edge
 * @param {Object} params { edgeId, isOperational }
 */
export const toggleEdgeStatus = async ({ edgeId, isOperational }) => {
  const response = await api.patch('/api/facilities/toggle-edge', {
    edgeId,
    isOperational,
  });
  return response.data;
};

export default api;
