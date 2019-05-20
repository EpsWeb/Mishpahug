export class AdditionalDataForCalendarEvent {
  constructor(
    public holiday: string,
    public city: string,
    public duration: number,
    public description: string,
    public rate: number,
    public numberOfVoters: number,
    public picture: string
  ) {
  }
}

