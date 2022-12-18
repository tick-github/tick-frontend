export interface GmailSingleMessageResponse {
  id: string,
  threadId: string,
  labelIds: string[],
  snippet: string,
  payload: GmailMessagePayload,
  sizeEstimate: number,
  historyId: string,
  internalDate: string
}

export interface GmailMessagePayload {
  partId: string,
  mimeType: string,
  fileName: string,
  headers: GmailMessageHeader[],
  body: GmailMessageBody
}

export interface GmailMessageBody {
  size: number,
  data: string
}

export interface GmailMessageHeader {
  name: string,
  value: string
}
