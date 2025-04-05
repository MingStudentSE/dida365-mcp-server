import { z } from 'zod';
import { ticktickRequest } from '../common/utils.js';

export const GetTaskByIdsSchema = z.object({
  projectId: z.string().describe('Project identifier'),
  taskId: z.string().describe('Task identifier'),
});

export const TickTickGetTaskByIdsResponseSchema = z.object({
  id: z.string(),
  isAllDay: z.boolean(),
  projectId: z.string(),
  title: z.string(),
  content: z.string(),
  desc: z.string(),
  timeZone: z.string(),
  repeatFlag: z.string(),
  startDate: z.string(),
  dueDate: z.string(),
  reminders: z.array(z.string()),
  priority: z.number(),
  status: z.number(),
  completedTime: z.string(),
  sortOrder: z.number(),
  items: z.array(
    z.object({
      id: z.string(),
      status: z.number(),
      title: z.string(),
      sortOrder: z.number(),
      startDate: z.string(),
      isAllDay: z.boolean(),
      timeZone: z.string(),
      completedTime: z.string(),
    })
  ),
});

export type TickTickGetTaskByIdsResponse = z.infer<
  typeof TickTickGetTaskByIdsResponseSchema
>;

export async function getTaskByIds(projectId: string, taskId: string) {
  const url = `https://api.ticktick.com/open/v1/project/${projectId}/task/${taskId}`;

  const response = await ticktickRequest(url);

  return TickTickGetTaskByIdsResponseSchema.parse(response);
}
