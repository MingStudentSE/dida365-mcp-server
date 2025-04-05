import { z } from 'zod';
import { ticktickRequest } from '../common/utils.js';

export const TickTickGetUserProjectsResponseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    color: z.string().optional(),
    sortOrder: z.number().optional(),
    kind: z.string().optional(),
    closed: z.boolean().optional(),
    groupId: z.string().optional(),
    viewMode: z.string().optional(),
    permission: z.string().optional(),
  })
);

export type TickTickGetUserProjectsResponse = z.infer<
  typeof TickTickGetUserProjectsResponseSchema
>;

export async function getUserProjects() {
  const url = `https://api.ticktick.com/open/v1/project`;

  const response = await ticktickRequest(url);

  return TickTickGetUserProjectsResponseSchema.parse(response);
}
