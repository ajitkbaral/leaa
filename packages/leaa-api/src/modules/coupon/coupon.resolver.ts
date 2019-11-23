import { Args, Query, Mutation, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { Int } from 'type-graphql';

import { Coupon, User, Ax } from '@leaa/common/src/entrys';
import {
  CouponsArgs,
  CouponsWithPaginationObject,
  CouponArgs,
  CreateCouponInput,
  UpdateCouponInput,
} from '@leaa/common/src/dtos/coupon';
import { UserDecorator } from '@leaa/api/src/decorators';
import { AxAttachmentsObject } from '@leaa/common/src/dtos/ax';
import { CouponService } from '@leaa/api/src/modules/coupon/coupon.service';
import { CouponProperty } from '@leaa/api/src/modules/coupon/coupon.property';
import { AxProperty } from '@leaa/api/src/modules/ax/ax.property';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponService: CouponService, private readonly couponProperty: CouponProperty) {}

  @ResolveProperty(() => Boolean)
  async available(@Parent() coupon: Coupon): Promise<boolean> {
    return this.couponProperty.resolvePropertyAvailable(coupon);
  }

  //
  //

  @Query(() => CouponsWithPaginationObject)
  async coupons(
    @Args() args: CouponsArgs,
    @UserDecorator() user?: User,
  ): Promise<CouponsWithPaginationObject | undefined> {
    return this.couponService.coupons(args, user);
  }

  @Query(() => Coupon)
  async coupon(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args() args?: CouponArgs,
    @UserDecorator() user?: User,
  ): Promise<Coupon | undefined> {
    return this.couponService.coupon(id, args, user);
  }

  @Mutation(() => Coupon)
  async createCoupon(@Args('coupon') args: CreateCouponInput): Promise<Coupon | undefined> {
    return this.couponService.createCoupon(args);
  }

  @Mutation(() => Coupon)
  async updateCoupon(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('coupon') args: UpdateCouponInput,
  ): Promise<Coupon | undefined> {
    return this.couponService.updateCoupon(id, args);
  }

  @Mutation(() => Coupon)
  async deleteCoupon(@Args({ name: 'id', type: () => Int }) id: number): Promise<Coupon | undefined> {
    return this.couponService.deleteCoupon(id);
  }
}