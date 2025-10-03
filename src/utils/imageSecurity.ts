// Additional security measures for image protection

// Function to show protection messages
const showProtectionMessage = (message: string) => {
  // Remove any existing message
  const existingMessage = document.getElementById('protection-message')
  if (existingMessage) {
    existingMessage.remove()
  }

  // Create new message
  const messageDiv = document.createElement('div')
  messageDiv.id = 'protection-message'
  messageDiv.textContent = message
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff4444;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  `

  // Add CSS animation
  if (!document.getElementById('protection-animation')) {
    const style = document.createElement('style')
    style.id = 'protection-animation'
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `
    document.head.appendChild(style)
  }

  document.body.appendChild(messageDiv)

  // Remove message after 3 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove()
    }
  }, 3000)
}

export const addImageSecurity = () => {
  // Disable right-click context menu globally for entire website
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    
    // Show a brief warning message
    showProtectionMessage('Right-click is disabled on this website')
    
    return false
  })

  // Disable drag and drop globally
  document.addEventListener('dragstart', (e) => {
    e.preventDefault()
    return false
  })
  
  // Disable drag over
  document.addEventListener('dragover', (e) => {
    e.preventDefault()
    return false
  })
  
  // Disable drop
  document.addEventListener('drop', (e) => {
    e.preventDefault()
    return false
  })

  // Disable keyboard shortcuts globally
  document.addEventListener('keydown', (e) => {
    // Disable Ctrl+S (Save)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      showProtectionMessage('Saving is disabled on this website')
      return false
    }
    
    // Disable Ctrl+A (Select All) - except in input fields
    if (e.ctrlKey && e.key === 'a' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault()
      showProtectionMessage('Text selection is disabled on this website')
      return false
    }
    
    // Disable Ctrl+C (Copy) - except in input fields
    if (e.ctrlKey && e.key === 'c' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault()
      showProtectionMessage('Copying is disabled on this website')
      return false
    }
    
    // Disable Ctrl+V (Paste) - except in input fields
    if (e.ctrlKey && e.key === 'v' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault()
      return false
    }
    
    // Disable Ctrl+X (Cut) - except in input fields
    if (e.ctrlKey && e.key === 'x' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault()
      return false
    }
    
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
      e.preventDefault()
      showProtectionMessage('Developer tools are disabled on this website')
      return false
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault()
      showProtectionMessage('Developer tools are disabled on this website')
      return false
    }
    
    // Disable Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault()
      showProtectionMessage('Element inspection is disabled on this website')
      return false
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault()
      showProtectionMessage('Console access is disabled on this website')
      return false
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault()
      showProtectionMessage('View source is disabled on this website')
      return false
    }
    
    // Disable Ctrl+Shift+U (View Source alternative)
    if (e.ctrlKey && e.shiftKey && e.key === 'U') {
      e.preventDefault()
      showProtectionMessage('View source is disabled on this website')
      return false
    }
  })

  // Disable text selection globally (except input fields)
  document.addEventListener('selectstart', (e) => {
    const target = e.target as HTMLElement
    if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) {
      e.preventDefault()
      return false
    }
  })

  // Add enhanced protection to all avatar images
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
      ;(overlay.style as any).webkitUserSelect = 'none'
      ;(overlay.style as any).mozUserSelect = 'none'
      ;(overlay.style as any).msUserSelect = 'none'
      
      // Add watermark overlay
      const watermark = document.createElement('div')
      watermark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        color: rgba(255, 0, 0, 0.4);
        font-size: 20px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        z-index: 11;
        white-space: nowrap;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      `
      watermark.textContent = 'PROTECTED'
      ;(watermark.style as any).mozUserSelect = 'none'
      ;(watermark.style as any).msUserSelect = 'none'

      // Add noise overlay to make screenshots less clear
      const noiseOverlay = document.createElement('div')
      noiseOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 1px, transparent 1px),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 1px, transparent 1px),
          radial-gradient(circle at 40% 60%, rgba(255,255,255,0.15) 1px, transparent 1px);
        background-size: 15px 15px, 25px 25px, 20px 20px;
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        z-index: 12;
      `
      ;(noiseOverlay.style as any).mozUserSelect = 'none'
      ;(noiseOverlay.style as any).msUserSelect = 'none'
      
      container.style.position = 'relative'
      container.appendChild(overlay)
      container.appendChild(watermark)
      container.appendChild(noiseOverlay)

      // Add CSS filters to make the image less clear and harder to screenshot cleanly
      const imgElement = img as HTMLImageElement
      imgElement.style.filter = 'blur(1px) contrast(1.2) brightness(1.1) saturate(1.1)'
      imgElement.style.imageRendering = 'auto'
      imgElement.style.transform = 'scale(1.001)' // Subtle scaling to break pixel-perfect screenshots
    }
  })

  // Enhanced screenshot detection and prevention
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
            showProtectionMessage('Screenshot attempt detected!')
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

    // Monitor window focus/blur (common in screenshot tools)
    let focusLost = false
    window.addEventListener('blur', () => {
      focusLost = true
      setTimeout(() => {
        if (focusLost) {
          // Page lost focus for more than 100ms - possible screenshot
          showProtectionMessage('Suspicious activity detected!')
          document.body.style.filter = 'blur(3px)'
          setTimeout(() => {
            document.body.style.filter = 'none'
          }, 1500)
        }
        focusLost = false
      }, 100)
    })

    window.addEventListener('focus', () => {
      focusLost = false
    })

    // Monitor for rapid mouse movements (screenshot tool indicators)
    let mouseMoveCount = 0
    let mouseMoveTimer: number
    document.addEventListener('mousemove', () => {
      mouseMoveCount++
      clearTimeout(mouseMoveTimer)
      mouseMoveTimer = setTimeout(() => {
        if (mouseMoveCount > 10) {
          // Rapid mouse movements detected
          showProtectionMessage('Suspicious mouse activity detected!')
        }
        mouseMoveCount = 0
      }, 1000)
    })

    // Monitor for developer tools opening
    let devtools = { open: false, orientation: null }
    const threshold = 160
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true
          showProtectionMessage('Developer tools detected!')
          document.body.style.filter = 'blur(8px)'
          setTimeout(() => {
            document.body.style.filter = 'none'
          }, 3000)
        }
      } else {
        devtools.open = false
      }
    }, 500)
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
