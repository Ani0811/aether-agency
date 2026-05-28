import { getCookie } from './cookies'

let isInitialized = false

export function initGA() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  // Check cookie consent first
  const consent = getCookie('g1media_cookie_consent')
  if (consent !== 'accepted') {
    return
  }

  if (isInitialized) return

  // Only load and initialize GA inside production environments when a Measurement ID is configured
  if (!measurementId || !import.meta.env.PROD) {
    if (!import.meta.env.PROD) {
      console.log('[Analytics] Bypassed script loader in development mode (Consent was Accepted).')
    }
    return
  }

  // Inject tracking script tag 1
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script1)

  // Inject tracking script tag 2
  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      send_page_view: false // Disabled automatic page views so we can track SPA route changes manually
    });
  `
  document.head.appendChild(script2)
  isInitialized = true
}

export function trackPageView(path) {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const consent = getCookie('g1media_cookie_consent')
  
  if (consent !== 'accepted') return
  if (!measurementId || !import.meta.env.PROD || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    send_to: measurementId
  })
}

