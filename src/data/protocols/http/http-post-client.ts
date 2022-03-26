export interface HttpPostClient{
  post(url: String): Promise<void>;
}
