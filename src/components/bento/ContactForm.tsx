'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, MessageSquare, User, Send, CheckCircle, Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site-config';

// Enhanced Zod validation schema with comprehensive rules
const formSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name must be less than 50 characters.' })
    .trim()
    .refine((val) => /^[a-zA-Z\u4e00-\u9fa5\s'-]+$/.test(val), {
      message: 'Name can only contain letters, spaces, and hyphens.',
    })
    .transform((val) => val.trim()),
  email: z.string()
    .min(5, { message: 'Email must be at least 5 characters.' })
    .max(100, { message: 'Email must be less than 100 characters.' })
    .email({ message: 'Please enter a valid email address.' })
    .toLowerCase()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Email format is invalid.',
    }),
  subject: z.string()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(100, { message: 'Subject must be less than 100 characters.' })
    .trim()
    .refine((val) => /^[a-zA-Z0-9\s\?\!\.\,\-_]+$/.test(val), {
      message: 'Subject contains invalid characters.',
    })
    .transform((val) => val.trim()),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message must be less than 1000 characters.' })
    .trim()
    .refine((val) => val.length >= 10, {
      message: 'Please provide more details in your message.',
    })
    .transform((val) => val.trim()),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onBlur',
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error?.message || 'Failed to send message');
      }

      setIsSubmitted(true);
      toast.success('Message sent successfully!');

      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get field error helper
  const getFieldError = (fieldName: keyof FormValues) => {
    const error = form.formState.errors[fieldName];
    return error?.message;
  };

  // Check if field has error
  const hasFieldError = (fieldName: keyof FormValues) => {
    return !!form.formState.errors[fieldName];
  };

  return (
    <section className="max-w-4xl mx-auto relative z-50 pointer-events-auto transform-none" style={{ transform: 'none' }}>
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        Let's Work Together
      </motion.h2>

      <motion.p
        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Have a project in mind? I'd love to hear about it. Reach out and let's create something amazing together.
      </motion.p>

      <div className="max-w-2xl mx-auto">
        <div className="glass-effect rounded-2xl p-6 shadow-2xl shadow-purple-500/10 border border-white/10 transform-none" style={{ transform: 'none' }}>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <Input
                            placeholder="Your name"
                            className={`pl-10 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 ${
                              hasFieldError('name') ? 'border-red-500 focus:border-red-500' : ''
                            }`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className={`pl-10 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 ${
                              hasFieldError('email') ? 'border-red-500 focus:border-red-500' : ''
                            }`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Subject *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <Input
                            placeholder="Project inquiry"
                            className={`pl-10 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 ${
                              hasFieldError('subject') ? 'border-red-500 focus:border-red-500' : ''
                            }`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          rows={6}
                          className={`bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 resize-none ${
                            hasFieldError('message') ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <FormMessage />
                        <span>{field.value.length}/1000</span>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || !form.formState.isValid}
                  className="w-full h-auto py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-500 disabled:hover:to-blue-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-400 mb-4">
          Prefer email? Reach out directly at
        </p>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
        >
          <Mail className="w-5 h-5" />
          {siteConfig.contact.email}
        </a>
      </motion.div>
    </section>
  );
}
