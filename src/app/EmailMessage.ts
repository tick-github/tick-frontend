export class EmailMessage {
  public subject: string
  public sender: string
  public sentDate: string

  constructor(subject: string, sender: string, sentDate: string) {
    this.subject = subject
    this.sender = sender
    this.sentDate = sentDate
  }
}
