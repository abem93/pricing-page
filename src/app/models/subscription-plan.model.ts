export class SubscriptionPlan {
  constructor(
    public name: string,
    public target: string,
    public price: number,
    public discountPrice: number,
    public users: number,
    public spaces: number[],
    public features: string[],
  ) {}
}