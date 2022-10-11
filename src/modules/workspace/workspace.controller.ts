import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

}
