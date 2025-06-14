import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getResults } from "../../../Redux/Features/Instructor/Results/GetAllResultsSlice";
import { useEffect } from 'react';

const Results = () => {

  // get results
  const dispatch = useDispatch();

  const {
    data: results,
    loading,
    error,
  } = useSelector((state) => state.resultsData) || {};

  const userRole = useSelector((state) => state.users.role); // Assuming 'users' is the slice name where the user role is stored

  console.log(results)
  useEffect(() => {
    dispatch(getResults());
  }, [dispatch]);

  return (
    <>
      <h2 className="p-5">Results</h2>
      <div className="flex justify-center">
        <table className="border-separate border-spacing-1 table-fixed w-10/12">
          <thead>
            <tr>
              <th className="border border-slate-400 rounded-l-md bg-black text-white">Title</th>
              {/* <th className="border border-slate-400 px-2 bg-black text-white">Group Id</th> */}
              <th className="border border-slate-400 px-2 bg-black text-white">Duration</th>
              <th className="border border-slate-400 px-2 bg-black text-white">Code</th>
              <th className="border border-slate-400 px-2 bg-black text-white">Type</th>
              <th className="border border-slate-400 px-2 bg-black text-white">Difficulty</th>
              {/* <th className="border border-slate-400 px-2 rounded-r-md bg-black text-white"></th> */}
            </tr>
          </thead>
          <tbody>
            {results && results.map((result) => (
              <tr key={result._id}>
                <td className="border border-slate-300 px-2 rounded-l-md">{result.quiz.title}</td>
                {/* <td className="border border-slate-400 px-2">{result.quiz.group}</td> */}
                <td className="border border-slate-400 px-2">{result.quiz.duration} </td>
                <td className="border border-slate-400 px-2">{result.quiz.code} </td>
                <td className="border border-slate-400 px-2">{result.quiz.type}</td>
                <td className="border border-slate-400 px-2">{result.quiz.difficulty}</td>
                {/* <td className="border border-slate-400 px-2 rounded-r-md">
                <button type="button" className="bg-green-600 rounded-full py-1 px-4 my-[0.5rem]">
                  <Link to={`/dashboard/results/viewresults/${result._id}`}>view</Link>
                </button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default Results