export interface CustomLeftCardProps {
    title: string;
    date: string;
    time: string;
    enrolledStudents: number;
    image: string;
    customWidth?: string;

  }

  export interface CustomRightCardProps{
    name: string;
    classRank: string;
    status:string;
    email:string;
    score: number;
    image: string;
  }

  export interface TableProps{
    title:string,
  name:string,
  personsNo:string,
  participants:string,
  date:number
  schadule:string
  status:string
  }

  export interface IncommingQuiz {
  _id: string;
  title: string;
  schadule: string;
  duration: number;
  participants: number;
  image?: string;
}

export interface IncommingStudent {
  _id: string;
  first_name: string;
  email: string;
  status: string;
  image?: string;
}


