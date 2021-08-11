export default class Campaign {
  constructor (
    private id: number,
    private author: string,
    private customer: string,
    private landingPages: string[],
    private createdAt: Date,
    private updatedAt: Date
  ){}
}