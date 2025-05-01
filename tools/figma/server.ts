#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

const API_KEY = process.env.FIGMA_API_KEY;
if (!API_KEY) {
  throw new Error('FIGMA_API_KEY environment variable is required');
}

interface FigmaFileResponse {
  document: {
    name: string;
    children: any[];
  };
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
}

interface GetDesignArgs {
  fileId: string;
}

const isValidGetDesignArgs = (args: unknown): args is GetDesignArgs => {
  if (typeof args !== 'object' || args === null) return false;
  const { fileId } = args as any;
  return typeof fileId === 'string';
};

class FigmaMcpServer {
  private server: Server;
  private axiosInstance;

  constructor() {
    this.server = new Server(
      {
        name: 'figma-design-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {
            get_design: {}
          },
        },
      }
    );

    this.axiosInstance = axios.create({
      baseURL: 'https://api.figma.com/v1',
      headers: {
        'X-Figma-Token': API_KEY,
      },
    });

    this.setupToolHandlers();
    
    // エラーハンドリング
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_design',
          description: 'Figmaファイルの情報を取得',
          inputSchema: {
            type: 'object',
            properties: {
              fileId: {
                type: 'string',
                description: 'FigmaファイルID',
              },
            },
            required: ['fileId'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'get_design') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      if (!isValidGetDesignArgs(request.params.arguments)) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'fileIdは必須で、文字列である必要があります'
        );
      }

      const { fileId } = request.params.arguments;

      try {
        const response = await this.axiosInstance.get<FigmaFileResponse>(
          `/files/${fileId}`
        );

        const { name, lastModified, thumbnailUrl, version } = response.data;
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                name,
                lastModified,
                thumbnailUrl,
                version,
                message: 'Figmaデザイン情報の取得に成功しました'
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message ?? error.message;
          throw new McpError(
            ErrorCode.InternalError,
            `Figma API エラー: ${errorMessage}`
          );
        }
        throw error;
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Figma MCP サーバーが起動しました');
  }
}

const server = new FigmaMcpServer();
server.run().catch(console.error);