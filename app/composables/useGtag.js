export function useGtag() {
  function gtag(...args) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag(...args)
    }
  }
  return { gtag }
}
