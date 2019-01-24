export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public dateOfBirth: string,
    public maritalStatus: string,
    public gender: string,
    public confession: string,
    public language: any,
    public foodPreferences: any,
    public description: string,
    public pictureLink: any,
    public banner: string,
    public rate: number,
    public numberOfVotes: number,
    public id?: number
  ) {
  }
}
