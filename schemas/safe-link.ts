import z from 'zod';

const safeLinkSchema = z.object({
  url: z.url({
    protocol: /^(https|http)$/,
    hostname: z.regexes.domain,
  }),
});

export { safeLinkSchema };
