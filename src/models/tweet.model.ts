import { Like } from "./like.model";
import { Reply } from "./reply.model";

export class Tweet {
  constructor(
    private _id: string,
    private _content: string,
    private _type: string,
    private _likes?: Like[],
    private _replies?: Reply[]
  ) {}

  public get id(): string {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public get type(): string {
    return this._type;
  }

  public get likes(): Like[] | undefined {
    return this._likes;
  }
  public get replies(): Reply[] | undefined {
    return this._replies;
  }

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
      type: this._type,
    };
  }
}
