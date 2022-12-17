export interface GmailMessageIdResponse {
  messages: GmailMessageIdPair[],
  nextPageToken: string,
  resulSizeEstimate: number
}

export interface GmailMessageIdPair {
  id: string,
  threadId: string
}
