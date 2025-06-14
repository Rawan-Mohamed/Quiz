
import { useState } from 'react';
function ViewResults() {

    const [tableRow, setTableRow] = useState([1, 2, 3, 4, 5, 6, 7])
    return (
        <>
            <h2 className=" mx-4 pb-5">Quizes <span className="text-green-600">{" >> "}</span>  Data structure quize one</h2>
            <div className='border border-solid w-fit rounded-md pb-8 px-3 mx-4'>
                <h1 className='py-4'>Results</h1>
                <table className="border-separate border-spacing-1 table-fixed">
                    <thead>
                        <tr>
                            <th className="border border-slate-400 rounded-l-md bg-black text-white">Student Name</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Score</th>
                            <th className="border border-slate-400 px-2 bg-black text-white">Time submitted</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableRow?.map((row) => {
                                return (
                                    <tr key={row}>
                                        <td className="border border-slate-300 px-2 rounded-l-md">Muhammad ahmad</td>
                                        <td className="border border-slate-400 px-2">16</td>
                                        <td className="border border-slate-400 px-2">9:00</td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewResults