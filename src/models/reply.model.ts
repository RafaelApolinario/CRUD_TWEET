import { Like } from "./like.model";

export class Reply {
  constructor(
    private _id: string,
    private _content: string,
    private _likes?: Like[]
  ) {}

  public get id(): string {
    return this._id;
  }
  public get content(): string {
    return this._content;
  }
  public get likes(): Like[] | undefined {
    return this._likes;
  }

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
    };
  }
}
