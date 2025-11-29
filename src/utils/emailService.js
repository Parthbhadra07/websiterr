// Backend API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Send contact form email via backend API
 */
export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        timeline: formData.timeline,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to send email' };
    }

    return { success: true, response: data };
  } catch (error) {
    console.error('API error:', error);
    return { success: false, error: error.message || 'Network error. Please check if the server is running.' };
  }
};

/**
 * Send pricing quote request email via backend API
 */
export const sendPricingEmail = async (formData, quoteDetails = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pricing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message,
        squareFeet: quoteDetails.squareFeet || 'N/A',
        tier: quoteDetails.tier || 'N/A',
        estimatedQuote: quoteDetails.quote || 'N/A',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to send email' };
    }

    return { success: true, response: data };
  } catch (error) {
    console.error('API error:', error);
    return { success: false, error: error.message || 'Network error. Please check if the server is running.' };
  }
};

