# TickTick MCP Server

> ⚠️ **Note**: This project is currently under active development. Features and documentation may be incomplete or subject to change.

MCP Server for the TickTick API, enabling task management, project organization, habit tracking, and more.

### Features

- ✅ **Task Management**: Create, read, update, and delete tasks with all available properties
- 📊 **Project Management**: Create, read, update, and delete projects with customizable views
- 📋 **Subtask Support**: Full support for managing subtasks within parent tasks
- 🔄 **Complete Task Control**: Set priorities, due dates, reminders, and recurring rules
- 🔐 **OAuth Authentication**: Full OAuth2 implementation for secure API access
- ⚠️ **Comprehensive Error Handling**: Clear error messages for common issues

## Tools

1. `get_task_by_ids`

   - Get a specific task by project ID and task ID
   - Inputs:
     - `projectId` (string): Project identifier
     - `taskId` (string): Task identifier
   - Returns: Complete task details including subtasks

2. `create_task`

   - Create a new task in a project
   - Inputs:
     - `title` (string): Task title
     - `projectId` (string): Project identifier
     - `content` (optional string): Task content/description
     - `desc` (optional string): Description of checklist
     - `isAllDay` (optional boolean): All day flag
     - `startDate` (optional string): Start date and time in ISO format
     - `dueDate` (optional string): Due date and time in ISO format
     - `timeZone` (optional string): The time zone for dates
     - `reminders` (optional array): List of reminder triggers
     - `repeatFlag` (optional string): Recurring rules of task
     - `priority` (optional integer): Task priority (0-5)
     - `sortOrder` (optional integer): Task sort order
     - `items` (optional array): List of subtasks
   - Returns: Created task details

3. `update_task`

   - Update an existing task
   - Inputs:
     - `taskId` (string): Task identifier
     - `id` (string): Task ID
     - `projectId` (string): Project identifier
     - `title` (optional string): Task title
     - `content` (optional string): Task content
     - `desc` (optional string): Description of checklist
     - `isAllDay` (optional boolean): All day flag
     - `startDate` (optional string): Start date and time
     - `dueDate` (optional string): Due date and time
     - `timeZone` (optional string): The time zone
     - `reminders` (optional array): List of reminder triggers
     - `repeatFlag` (optional string): Recurring rules
     - `priority` (optional integer): Task priority
     - `sortOrder` (optional integer): Task sort order
     - `items` (optional array): List of subtasks
   - Returns: Updated task details

4. `complete_task`

   - Mark a task as completed
   - Inputs:
     - `projectId` (string): Project identifier
     - `taskId` (string): Task identifier
   - Returns: Success confirmation

5. `delete_task`

   - Delete a task from a project
   - Inputs:
     - `projectId` (string): Project identifier
     - `taskId` (string): Task identifier
   - Returns: Success confirmation

6. `get_user_projects`

   - Get all projects for the authenticated user
   - Inputs: None
   - Returns: Array of project details

7. `get_project_by_id`

   - Get a specific project by ID
   - Inputs:
     - `projectId` (string): Project identifier
   - Returns: Project details

8. `get_project_with_data`

   - Get project details along with tasks and columns
   - Inputs:
     - `projectId` (string): Project identifier
   - Returns: Project data including tasks and kanban columns

9. `create_project`

   - Create a new project
   - Inputs:
     - `name` (string): Project name
     - `color` (optional string): Color of project (e.g., "#F18181")
     - `sortOrder` (optional integer): Sort order value
     - `viewMode` (optional string): View mode ("list", "kanban", "timeline")
     - `kind` (optional string): Project kind ("TASK", "NOTE")
   - Returns: Created project details

10. `update_project`

    - Update an existing project
    - Inputs:
      - `projectId` (string): Project identifier
      - `name` (optional string): Project name
      - `color` (optional string): Color of project
      - `sortOrder` (optional integer): Sort order value
      - `viewMode` (optional string): View mode
      - `kind` (optional string): Project kind
    - Returns: Updated project details

11. `delete_project`
    - Delete a project
    - Inputs:
      - `projectId` (string): Project identifier
    - Returns: Success confirmation

## Tasks Properties

When creating or updating tasks, you can include these properties:

- **Priority Levels**:
  - `0`: None
  - `1`: Low
  - `3`: Medium
  - `5`: High
- **Status Values**:
  - `0`: Normal (not completed)
  - `2`: Completed
- **Reminder Format**:
  - Example: `["TRIGGER:P0DT9H0M0S", "TRIGGER:PT0S"]`
  - Follows iCalendar TRIGGER format
- **Recurring Rules (repeatFlag)**:
  - Example: `"RRULE:FREQ=DAILY;INTERVAL=1"`
  - Uses RFC 5545 recurrence rules
- **Date Format**:
  - ISO 8601 format: `"yyyy-MM-dd'T'HH:mm:ssZ"`
  - Example: `"2019-11-13T03:00:00+0000"`

## Projects Properties

When creating or updating projects, you can use these properties:

- **View Modes**:
  - `"list"`: Standard list view
  - `"kanban"`: Kanban board view
  - `"timeline"`: Timeline view
- **Project Kinds**:
  - `"TASK"`: Task-oriented project
  - `"NOTE"`: Note-oriented project

## Setup

### OAuth Authentication

[Register your application with TickTick](https://developer.ticktick.com/manage) to obtain API credentials:

- Create a developer account at [TickTick Developer Portal](https://developer.ticktick.com/)
- Register a new application
- Configure the redirect URL for OAuth flow
- Copy the Client ID and Client Secret

### First-time Authorization

When using the TickTick MCP server for the first time:

1. You'll be prompted to authorize the application
2. A browser window will open with the TickTick login page
3. After login, you'll be asked to grant permissions
4. The authorization will be stored for future use

### Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

#### Docker

```json
{
  "mcpServers": {
    "ticktick": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "TICKTICK_CLIENT_ID",
        "-e",
        "TICKTICK_CLIENT_SECRET",
        "mcp/ticktick"
      ],
      "env": {
        "TICKTICK_CLIENT_ID": "<YOUR_CLIENT_ID>",
        "TICKTICK_CLIENT_SECRET": "<YOUR_CLIENT_SECRET>"
      }
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "ticktick": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-ticktick"],
      "env": {
        "TICKTICK_CLIENT_ID": "<YOUR_CLIENT_ID>",
        "TICKTICK_CLIENT_SECRET": "<YOUR_CLIENT_SECRET>"
      }
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/ticktick -f src/ticktick/Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
