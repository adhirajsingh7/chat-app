interface IUser {
  username: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}


interface IMessage {
  socketId: string;
  room: string;
  message: string;
  date: Date;
}