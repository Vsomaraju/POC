/**
 * Utility functions for Server-Side Rendering (SSR) detection
 */

/**
 * Check if code is running on the server (SSR) or client
 * @returns true if running on server, false if running on client
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};

/**
 * Check if code is running on the client (browser)
 * @returns true if running on client, false if running on server
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Check if the current render is from SSR (server-side)
 * This is useful for components that need to behave differently during SSR
 * @returns true if this is an SSR render
 */
export const isSSR = (): boolean => {
  return typeof window === 'undefined' || !window.document;
};

/**
 * Check if the current render is a hydration (client-side after SSR)
 * @returns true if this is a hydration render
 */
export const isHydration = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if root element has children (SSR content)
  const root = document.getElementById('root');
  return root !== null && root.hasChildNodes();
};

/**
 * Get the render environment
 * @returns 'server' | 'client' | 'hydration'
 */
export const getRenderEnvironment = (): 'server' | 'client' | 'hydration' => {
  if (isServer()) return 'server';
  if (isHydration()) return 'hydration';
  return 'client';
};

