import { IsOptional } from 'class-validator';
import { Field, InputType, Int, Float } from 'type-graphql';

@InputType()
export class UpdateProductInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  fullname?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  serial?: string;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  price?: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  cost_price?: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  market_price?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  status?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  sort?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  brandIds?: number[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  styleIds?: number[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  bannerIds?: number[];
}
