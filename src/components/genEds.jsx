import MassSelectCourse from "./massSelectCourse"

const GenEdsModel = ({genEds, coursesList}) => {
    return(
        
        genEds.map((genEd) => 
            <div key={genEd?._id}>
                <h2>General Requirements</h2>
                <ul className="accordion">
                    <li>
                        <input type="checkbox" name="accordion" id="genEd" />
                        <label id="genReqLabel" htmlFor="genEd">Academic Year: {genEd?.year}</label>
                        <div className="classHistory">
                            {genEd?.requirements && genEd?.requirements.map((area) => (
                                <div key={area?._id}>
                                    <h3>{area?.label}</h3>
                                    <p>Credit hours: {area?.hours}</p>
                                    <p>{area?.info}</p>
                                    {area?.sub && area.sub.map((subareas)=> {if(subareas?.categories && subareas.categories.length > 0){return(
                                        <div key={subareas?._id}>
                                            <h4>{subareas?.label}</h4>
                                            <p>{subareas?.info}</p>
                                            
                                                
                                            <MassSelectCourse coursesList={coursesList}/>
                                                
                                        </div>
                                    )}
                                    else{
                                        return(
                                            <div key={subareas?._id}>
                                                <h4>{subareas?.label}</h4>
                                                <p>{subareas?.info}</p>
                                                
                                            </div>
                                        )
                                    }})}
                                
                                
                                </div>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        )
                
    )
}

export default GenEdsModel