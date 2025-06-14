// ... (import statements)

interface TableProps {
  data: {
    title: string;
    status: string;
    schadule: string;
    participants: string;
  }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div>
      <table className="border-separate border-spacing-1 table-fixed">
        <thead>
          <tr>
            <th className="border border-slate-400 rounded-l-md bg-black text-white">Title</th>
            <th className="border border-slate-400 px-2 bg-black text-white">Status</th>
            <th className="border border-slate-400 px-2 bg-black text-white">Schadule</th>
            <th className="border border-slate-400 px-2 bg-black text-white">Participants</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quiz, index) => (
            <tr key={index}>
              <td className="border border-slate-300 px-2 rounded-l-md">{quiz.title}</td>
              <td className="border border-slate-400 px-2">{quiz.status}</td>
              <td className="border border-slate-400 px-2">{new Date(quiz.schadule).toLocaleString()}</td>
              <td className="border border-slate-400 px-2">{quiz.participants}</td>
              {/* Additional columns go here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
