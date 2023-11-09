const GenEdsModel = ({genEds}) => {
    return(
        <ul className="accordion">
            <li>
                <input type="checkbox" name="accordion" id="genEd" />
                <label id="genReqLabel" htmlFor="genEd">General Requirements</label>
                <div className="classHistory">
                    { genEds.map((genEd) => 
                    <div key={genEd?._id}>
                        <h3>Academic Year: {genEd?.year}</h3>
                        {genEd?.requirements && genEd?.requirements.map((area) => (
                            <div key={area?._id}>
                                <h3>{area?.label}</h3>
                                <p>Credit hours: {area?.hours}</p>
                                <p>{area?.info}</p>
                                {area?.sub && area.sub.map((subareas)=> (
                                    <div key={subareas?._id}>
                                        <h4>{subareas?.label}</h4>
                                        <p>{subareas?.info}</p>
                                        {subareas?.categories && subareas.categories.map((coursearea) => (
                                            <div key={coursearea._id}>
                                                <p>{coursearea}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            
                            
                            </div>
                        ))}
                    </div>)}
                </div>
            </li>
        </ul>
    )
}

export default GenEdsModel