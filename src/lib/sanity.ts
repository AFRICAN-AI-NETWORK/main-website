import { createClient } from '@sanity/client'

export default createClient({
  projectId: '8lgl8ql7',
  dataset: 'resources',
  apiVersion: '2024-04-01',
  useCdn: true
})
