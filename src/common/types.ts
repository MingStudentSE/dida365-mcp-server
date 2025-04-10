import { z } from 'zod';

export const TickTickProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().optional(),
  sortOrder: z.number().optional(),
  kind: z.string().optional(),
  closed: z.boolean().optional(),
  groupId: z.string().optional(),
  viewMode: z.string().optional(),
  permission: z.string().optional(),
});

export const TickTickTaskSchema = z.object({
  id: z.string(),
  isAllDay: z.boolean().optional(),
  projectId: z.string(),
  title: z.string(),
  content: z.string().optional(),
  desc: z.string().optional(),
  timeZone: z.string().optional(),
  repeatFlag: z.string().optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  reminders: z.array(z.string()).optional(),
  priority: z.number().optional(),
  status: z.number(),
  completedTime: z.string().optional(),
  sortOrder: z.number().optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        status: z.number(),
        title: z.string(),
        sortOrder: z.number().optional(),
        startDate: z.string().optional(),
        isAllDay: z.boolean().optional(),
        timeZone: z.string().optional(),
        completedTime: z.string().optional(),
      })
    )
    .optional(),
});
