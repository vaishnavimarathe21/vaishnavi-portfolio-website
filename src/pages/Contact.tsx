import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

// Brand Icons
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const CodeChefIcon = ({ className }: { className?: string }) => (
  <img
    src="/images/codechef.jpeg"
    alt="CodeChef"
    className={`${className} rounded`}
  />
)

const GmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.27h.909c.904 0 1.636.732 1.636 1.636z"/>
  </svg>
)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Scroll to top when component mounts
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }
    
    // Use setTimeout to ensure DOM is ready
    setTimeout(scrollToTop, 0)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: GmailIcon,
      title: 'Email',
      value: 'marathekhushi6@gmail.com',
      href: 'mailto:marathekhushi6@gmail.com',
      color: 'text-red-500',
    },
    {
      icon: LinkedInIcon,
      title: 'LinkedIn',
      value: 'Connect with me on LinkedIn',
      href: 'https://www.linkedin.com/in/vmarathe21',
      color: 'text-blue-500',
    },
    {
      icon: GitHubIcon,
      title: 'GitHub',
      value: 'Check out my code repositories',
      href: 'https://github.com/vaishnavimarathe21',
      color: 'text-gray-600',
    },
    {
      icon: CodeChefIcon,
      title: 'CodeChef',
      value: 'View my competitive programming profile',
      href: 'https://www.codechef.com/users/rcp_221107017',
      color: 'text-orange-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4"
          >
            I'm always excited to discuss new opportunities, collaborate on projects, or answer any questions you might have
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                Send me a message
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 sm:mb-2">
                  Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors duration-200 text-sm sm:text-base"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 sm:mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors duration-200 text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 sm:mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors duration-200 text-sm sm:text-base"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 sm:mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors duration-200 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project or question..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Something went wrong. Please try again or contact me directly.</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                Contact Information
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 md:p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <info.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${info.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={info.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        className="text-sm sm:text-base text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-xl p-3 sm:p-4 md:p-6">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                Let's Connect!
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300">
                I'm always interested in discussing new opportunities, collaborating on projects, 
                or simply having a conversation about Artificial Intelligence and technology. Feel free to reach out through any of the channels above!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
