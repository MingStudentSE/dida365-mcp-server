import { z } from 'zod';

export const GetTaskByIdsSchema = z.object({
  projectId: z.string().describe('Project identifier'),
  taskId: z.string().describe('Task identifier'),
});
