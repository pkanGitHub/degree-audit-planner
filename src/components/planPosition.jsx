import { useState } from 'react';
import Popup from 'reactjs-popup';
import { Tooltip } from 'react-tooltip'
import * as User from '../lib/user';
import "../styles/audit.css"

export default function PlanPosition({ years, plan, set }) {

    if (!years) years = User.planYears() || 4;

    const [planYears, setYears] = useState(years || 4);
    const changeYear = (year) => {
        if (year < 1) year = 1;
        setYears(year);
    }

    if (!plan) plan = [-1, -1]

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: 'flex', flexDirection: "column", justifyContent: "flex-end", paddingRight: 10}}>
                <button 
                    id='termUpdate'
                    onClick={() => changeYear(planYears + 1)}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Add Year"
                    data-tooltip-place="top"
                    data-tooltip-variant="light"
                 >+</button>
                <button 
                    id='termUpdate'
                    onClick={() => changeYear(planYears - 1)}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Remove Year"
                    data-tooltip-place="top"
                    data-tooltip-variant="light"
                >-</button>
                <Tooltip id="tooltip" />
            </div>

            <table className='planningTable'>
                <tbody>
                    <tr>
                        <th></th>
                        <th>F</th>
                        <th>SP</th>
                        <th>SS</th>
                    </tr>
                    {Array.from({ length: planYears }).map((_, y) =>
                        <tr key={y} >
                            <th>Y{y + 1}&nbsp;</th>
                            {Array.from({ length: 3 }).map((_, s) =>
                                <td key={s} className={`planningCell ${plan[0] === y && plan[1] === s ? "selected" : ""}`} onClick={() => set(y, s)}></td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}