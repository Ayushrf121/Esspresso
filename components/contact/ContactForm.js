'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';

// Validation schema
const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const onSubmit = async (data) => {
    // Simulate API call
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Thank you for reaching out! We\'ll get back to you soon. ☕');
    reset();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={formRef} className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-coffee-800">
              Send Us a Message
            </h2>
            <p className="mt-2 text-coffee-500">
              We'll reply within 24 hours – we promise.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name + Email (2 cols) */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-300' : 'border-coffee-200'
                  } bg-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors text-coffee-800`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-300' : 'border-coffee-200'
                  } bg-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors text-coffee-800`}
                  placeholder="hello@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                {...register('subject')}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.subject ? 'border-red-300' : 'border-coffee-200'
                } bg-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors text-coffee-800`}
                placeholder="I'd like to know more about..."
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                {...register('message')}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.message ? 'border-red-300' : 'border-coffee-200'
                } bg-white focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors text-coffee-800 resize-none`}
                placeholder="Tell us what's on your mind..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gold text-coffee-900 font-medium px-8 py-4 rounded-xl hover:bg-gold/80 transition-all shadow-lg hover:shadow-xl text-lg group"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;