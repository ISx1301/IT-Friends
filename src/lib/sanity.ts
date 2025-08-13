import { sanityClient } from 'sanity:client'

export const query = async <T>(groq: string, params: Record<string, unknown> = {}) =>
  sanityClient.fetch<T>(groq, params)