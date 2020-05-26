import { Args, Query, Mutation, Resolver, Int } from '@nestjs/graphql';

import { Permission } from '@leaa/common/src/entrys';
import {
  PermissionsArgs,
  PermissionsWithPaginationObject,
  PermissionArgs,
  CreatePermissionInput,
  UpdatePermissionInput,
} from '@leaa/common/src/dtos/permission';
import { PermissionService } from '@leaa/api/src/modules/v1/permission/permission.service';
import { Permissions, GqlCtx } from '@leaa/api/src/decorators';

import { IGqlCtx } from '@leaa/api/src/interfaces';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Permissions('permission.list-read')
  @Query(() => PermissionsWithPaginationObject)
  async permissions(
    @GqlCtx() gqlCtx: IGqlCtx,
    @Args() args: PermissionsArgs,
  ): Promise<PermissionsWithPaginationObject> {
    return this.permissionService.permissions(gqlCtx, args);
  }

  @Permissions('permission.item-read')
  @Query(() => Permission)
  async permission(
    @GqlCtx() gqlCtx: IGqlCtx,
    @Args({ name: 'id', type: () => String }) id: string,
    @Args() args: PermissionArgs,
  ): Promise<Permission | undefined> {
    return this.permissionService.permission(gqlCtx, id, args);
  }

  @Permissions('permission.item-create')
  @Mutation(() => Permission)
  async createPermission(
    @GqlCtx() gqlCtx: IGqlCtx,
    @Args('permission') args: CreatePermissionInput,
  ): Promise<Permission | undefined> {
    return this.permissionService.createPermission(gqlCtx, args);
  }

  @Permissions('permission.item-update')
  @Mutation(() => Permission)
  async updatePermission(
    @GqlCtx() gqlCtx: IGqlCtx,
    @Args({ name: 'id', type: () => String }) id: string,
    @Args('permission') args: UpdatePermissionInput,
  ): Promise<Permission | undefined> {
    return this.permissionService.updatePermission(gqlCtx, id, args);
  }

  @Permissions('permission.item-delete')
  @Mutation(() => Permission)
  async deletePermission(
    @GqlCtx() gqlCtx: IGqlCtx,
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<Permission | undefined> {
    return this.permissionService.deletePermission(gqlCtx, id);
  }
}