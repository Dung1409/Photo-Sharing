// utils/dateFormat.js
/**
 * Formats a date string into a more readable format
 * @param {string} dateTimeStr - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return 'Unknown date';
    
    const date = new Date(dateTimeStr);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    // Format: Month Day, Year at Hour:Minute AM/PM
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    
    return date.toLocaleString('en-US', options);
  };