// Additional security measures for image protection

export const addImageSecurity = () => {
  // Disable right-click context menu globally for images
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG' && target.getAttribute('src')?.includes('avatar')) {
      e.preventDefault()
      return false
    }
  })

  // Disable drag and drop for images
  document.addEventListener('dragstart', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG' && target.getAttribute('src')?.includes('avatar')) {
      e.preventDefault()
      return false
    }
  })

  // Disable keyboard shortcuts for saving images
  document.addEventListener('keydown', (e) => {
    // Disable Ctrl+S (Save)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      return false
    }
    
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault()
      return false
    }
    
    // Disable Ctrl+C (Copy)
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      return false
    }
    
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
      e.preventDefault()
      return false
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault()
      return false
    }
    
    // Disable Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault()
      return false
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault()
      return false
    }
  })

  // Disable text selection on images
  document.addEventListener('selectstart', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG' && target.getAttribute('src')?.includes('avatar')) {
      e.preventDefault()
      return false
    }
  })

  // Add watermark overlay to all avatar images
  const avatarImages = document.querySelectorAll('img[src*="avatar"]')
  avatarImages.forEach((img) => {
    const container = img.parentElement
    if (container && !container.classList.contains('secure-image-container')) {
      container.classList.add('secure-image-container')
      
      // Add invisible overlay
      const overlay = document.createElement('div')
      overlay.style.position = 'absolute'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.background = 'transparent'
      overlay.style.pointerEvents = 'auto'
      overlay.style.zIndex = '10'
      overlay.style.userSelect = 'none'
      overlay.style.webkitUserSelect = 'none'
      overlay.style.mozUserSelect = 'none'
      overlay.style.msUserSelect = 'none'
      
      container.style.position = 'relative'
      container.appendChild(overlay)
    }
  })

  // Detect and prevent screenshot attempts
  let screenshotAttempts = 0
  const detectScreenshot = () => {
    // Monitor for rapid visibility changes (common in screenshot tools)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          screenshotAttempts++
          if (screenshotAttempts > 3) {
            // Blur the page if multiple screenshot attempts detected
            document.body.style.filter = 'blur(5px)'
            setTimeout(() => {
              document.body.style.filter = 'none'
              screenshotAttempts = 0
            }, 2000)
          }
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    })
  }

  // Initialize security measures
  detectScreenshot()

  // Re-apply security measures when new images are added
  const imageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          const images = element.querySelectorAll('img[src*="avatar"]')
          images.forEach((img) => {
            const container = img.parentElement
            if (container && !container.classList.contains('secure-image-container')) {
              container.classList.add('secure-image-container')
            }
          })
        }
      })
    })
  })

  imageObserver.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// CSS injection for additional protection
export const injectSecurityCSS = () => {
  const style = document.createElement('style')
  style.textContent = `
    /* Prevent image saving */
    img[src*="avatar"] {
      user-select: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      -webkit-user-drag: none !important;
      -webkit-touch-callout: none !important;
      -khtml-user-select: none !important;
      pointer-events: none !important;
      filter: blur(0.2px) !important;
    }
    
    /* Prevent screenshots on mobile */
    @media screen and (max-width: 768px) {
      img[src*="avatar"] {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -webkit-user-drag: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
    }
    
    /* Hide from print */
    @media print {
      img[src*="avatar"] {
        display: none !important;
      }
    }
  `
  document.head.appendChild(style)
}
