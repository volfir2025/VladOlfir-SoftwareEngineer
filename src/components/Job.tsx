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
                    return  <li key={index}>{item}</li>        
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