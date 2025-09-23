import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

/**
 * Get current user location using browser's geolocation API
 * @returns {Promise<{latitude: number, longitude: number, timestamp: Date}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({
          latitude,
          longitude,
          timestamp: new Date()
        });
      },
      (error) => {
        let errorMessage = 'Location access failed';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown location error occurred';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

/**
 * Update user location in the backend
 * @param {string} userId - User ID
 * @param {object} locationData - Location data object
 * @returns {Promise<object>} Updated user data
 */
export const updateUserLocation = async (userId, locationData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/users/${userId}/location`,
      locationData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to update user location'
    );
  }
};

/**
 * Get current location and update user in backend
 * @param {string} userId - User ID
 * @returns {Promise<object>} Result with location and updated user data
 */
export const getCurrentLocationAndUpdate = async (userId) => {
  try {
    const location = await getCurrentLocation();
    const result = await updateUserLocation(userId, location);
    
    return {
      success: true,
      location,
      user: result.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get users near a specific location
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {number} radius - Radius in kilometers (default: 10)
 * @returns {Promise<Array>} Array of users near the location
 */
export const getUsersNearLocation = async (latitude, longitude, radius = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/near-location`,
      {
        params: {
          latitude,
          longitude,
          radius
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to get users near location'
    );
  }
};

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lng1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lng2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Get address from coordinates using reverse geocoding (browser API)
 * Note: This is a basic implementation. For production, consider using a proper geocoding service
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<string>} Address string
 */
export const getAddressFromCoordinates = async (latitude, longitude) => {
  // This is a placeholder implementation
  // In a real application, you would use a geocoding service like Google Maps API
  try {
    // For now, just return coordinates as string
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (error) {
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  }
};
