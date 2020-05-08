import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Action } from '@leaa/common/src/entrys';
import { IActionsArgs, IActionArgs, IGqlCtx } from '@leaa/api/src/interfaces';
import { ActionsWithPaginationObject, CreateActionInput, UpdateActionInput } from '@leaa/common/src/dtos/action';
import { argsFormat, calcQbPageInfo, commonUpdate, commonDelete, errorMessage } from '@leaa/api/src/utils';

const CLS_NAME = 'ActionService';

@Injectable()
export class ActionService {
  constructor(@InjectRepository(Action) private readonly actionRepository: Repository<Action>) {}

  async actions(args: IActionsArgs, gqlCtx?: IGqlCtx): Promise<ActionsWithPaginationObject> {
    const nextArgs: IActionsArgs = argsFormat(args, gqlCtx);

    const PRIMARY_TABLE = 'actions';
    const qb = await this.actionRepository.createQueryBuilder(PRIMARY_TABLE);

    // q
    if (nextArgs.q) {
      const qLike = `%${nextArgs.q}%`;

      ['title', 'slug'].forEach((key) => {
        qb.orWhere(`${PRIMARY_TABLE}.${key} LIKE :${key}`, { [key]: qLike });
      });
    }

    // order
    if (nextArgs.orderBy && nextArgs.orderSort) {
      qb.orderBy(`${PRIMARY_TABLE}.${nextArgs.orderBy}`, nextArgs.orderSort);
    }

    return calcQbPageInfo({ qb, page: nextArgs.page, pageSize: nextArgs.pageSize });
  }

  async action(id: string, args?: IActionArgs, gqlCtx?: IGqlCtx): Promise<Action | undefined> {
    if (!id) throw errorMessage({ t: ['_error:notFoundId'], gqlCtx });

    let nextArgs: IActionArgs = {};

    if (args) {
      nextArgs = args;
    }

    return this.actionRepository.findOne(id, nextArgs);
  }

  async createAction(args: CreateActionInput): Promise<Action | undefined> {
    return this.actionRepository.save(args);
  }

  async updateAction(id: number, args: UpdateActionInput): Promise<Action | undefined> {
    return commonUpdate({
      repository: this.actionRepository,
      CLS_NAME,
      id,
      args,
    });
  }

  async deleteAction(id: string): Promise<Action | undefined> {
    return commonDelete({ repository: this.actionRepository, CLS_NAME, id });
  }
}
