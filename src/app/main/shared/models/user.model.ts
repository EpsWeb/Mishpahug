export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public dateOfBirth: string,
    public maritalStatus: string,
    public gender: string,
    public confession: string,
    public languages: [string],
    public foodPreferences: [string],
    public description: string,
    public pictureLink: [string, string],
    public email?: string,
    public rate?: number,
    public numberOfVotes?: number,
    public password?: string,
  ) {
  }
}
