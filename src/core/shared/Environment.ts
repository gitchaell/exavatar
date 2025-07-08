export const environment = Deno.env.get('ENV') as 'production' | 'development'
export const baseUrl = Deno.env.get('BASE_URL')
