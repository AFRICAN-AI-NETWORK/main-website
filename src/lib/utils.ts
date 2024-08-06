import { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function errHandler(err: unknown) {
  if (err instanceof AxiosError) {
    if (err.response?.data.message) {
      if (Array.isArray(err.response?.data.message)) return err.response?.data.message[0]
      return err.response?.data.message
    }
  }

  return 'An error occurred. Please try again later'
}
