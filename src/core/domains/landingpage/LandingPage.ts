export default class Campaign {
  constructor (
    private id: number,
    private url: string,
    private status: string,
    private createdAt: Date,
    private updatedAt: Date
  ){}
}