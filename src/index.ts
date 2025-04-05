#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import fetch, { Request, Response } from 'node-fetch';
import console from 'console';

import * as tasks from './operations/tasks.js';
import * as projects from './operations/projects.js';

import { formatTickTickError, isTickTickError } from './common/errors.js';
import { VERSION } from './common/version.js';
import z from 'zod';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// If fetch doesn't exist in global scope, add it
if (!globalThis.fetch) {
  globalThis.fetch = fetch as unknown as typeof global.fetch;
}

const server = new Server(
  {
    name: 'ticktick-mcp-server',
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_task_by_ids',
        description: 'Get a specific task by project ID and task ID',
        inputSchema: zodToJsonSchema(tasks.GetTaskByIdsSchema),
      },
      {
        name: 'get_user_projects',
        description: 'Get all user projects',
        inputSchema: zodToJsonSchema(z.object({})),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const toolsWithoutArguments = ['get_user_projects'];

    if (
      !request.params.arguments &&
      !toolsWithoutArguments.includes(request.params.name)
    ) {
      throw new Error('Arguments are required');
    }

    switch (request.params.name) {
      case 'get_task_by_ids': {
        const args = tasks.GetTaskByIdsSchema.parse(request.params.arguments);
        const result = await tasks.getTaskByIds(args.projectId, args.taskId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_user_projects': {
        const result = await projects.getUserProjects();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool name: ${request.params.name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
    }
    if (isTickTickError(error)) {
      throw new Error(formatTickTickError(error));
    }
    throw error;
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('TickTick MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
