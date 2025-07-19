import type { JSX } from 'react'
import type { JobContentType } from "../pages/Resume";

type JobPropsType = {
    content: JobContentType
    showhr?: boolean
}
export default function Job({ content, showhr }: JobPropsType): JSX.Element {
    const description =
        content.description ?
            <ul>
                {content.description.map((item, index) => {
                    if (item.substring(0, 4) === "[PL]") {                  
                        return <li key={index}><i>Project Lead:</i> {item.substring(4)}</li>;
                    }
                    if (item.substring(0, 4) === "[L2]") { //Level 2:                 
                        return <ul key={index}><li>{item.substring(4)}</li></ul>;
                    }                 
                    else { 
                        return  <li key={index}>{item}</li>
                        }
                })}
            </ul> : null;

    return (
        <section>
            <div>
                <div>
                    <h3>{content.company}</h3>
                    {content.location && <span>{content.location}</span>}
                </div>
                <span>{content.dates}</span>
            </div>
            <p>{content.title}</p>
            <p>{content.info}</p>
            {description}
            {showhr && <hr />}
        </section>
    )
}