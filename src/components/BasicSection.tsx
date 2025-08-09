import React from "react"
import type { JSX } from 'react'
import type { SkillsContentType } from "../pages/Resume";

type BasicSectionProps = {
    name: string
    description: string
    content: SkillsContentType[] | string[] 
}

function BasicSection({ name, description, content }: BasicSectionProps): JSX.Element {
    const sectionContent =
        content ?
            <ul>
                {
                    content.map((item: SkillsContentType | string, index: number) => {
                        if (typeof item === "object" && "skillName" in item && Array.isArray(item.skills)) {
                            // item is a SkillsContentType:
                            return (
                                <li key={index}>
                                    <span>{item.skillName}:</span>
                                    <span>{item.skills.join(', ')}</span>
                                </li>
                            );
                        } else {
                             return <li key={index}>{item as string}</li>;                          
                        }      
                    })
                }
            </ul> : null;

    console.log(`       BasicSection ${name} rendered`);
    return (      
        <section className="basic-section" id={name}>
            <h2>{description}</h2>
            {sectionContent}
        </section>
    );
}

//This will make sure to render this component when nessessary:
export default React.memo(BasicSection)