import { z } from 'zod';
import { ticktickRequest } from '../common/utils.js';
import { TickTickTaskSchema } from '../common/types.js';

export const GetTaskByIdsSchema = z.object({
  projectId: z.string().describe('Project identifier'),
  taskId: z.string().describe('Task identifier'),
});

export const GetTaskByIdsResponseSchema = TickTickTaskSchema;

export async function getTaskByIds(
  projectId: string,
  taskId: string
): Promise<z.infer<typeof GetTaskByIdsResponseSchema>> {
  const url = `https://api.ticktick.com/open/v1/project/${projectId}/task/${taskId}`;

  const response = await ticktickRequest(url);

  return GetTaskByIdsResponseSchema.parse(response);
}
