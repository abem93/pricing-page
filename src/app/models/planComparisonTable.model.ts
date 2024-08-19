export class PlanComparisonTableDetails {
  constructor(
    public category: string,
    public feature: string,
    public freePlan: boolean | string,
    public proPlan: boolean | string,
    public proPlusPlan: boolean | string,
    public businessPlan: boolean | string,
    public enterprisePlan: boolean | string,
  ){}
}