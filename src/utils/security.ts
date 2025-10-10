// Security utilities for sanitizing user inputs
export const sanitizeLog = (input: string): string => {
  return input.replace(/[\r\n]/g, '');
};

export const sanitizeHTML = (html: string): string => {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};