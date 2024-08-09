export class Camera {
  constructor(
    public name: string,
    public price: number,
    public url: string,
    public description?: string,
    public features?: string[],
    public reason?: string,
  ) {}
}