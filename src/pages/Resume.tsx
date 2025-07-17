import React from "react"
import data from "../data.js";
import BasicSection from "../components/BasicSection"
import Job from "../components/Job"
import { ResumeContext } from "../App"
import pdf_resume from "../assets/Vlad_Olfir_Resume.pdf"
import type { ResumeContextType } from "../App"
 
export type PersonalDataContentType = {
    name: string
    title: string
    phone: string
    email: string
}

export type PersonalInfoType = {
    name: string
    description: string
    content: PersonalDataContentType | PersonalDataContentType[]
}

export type ProfessionalProfileType = {
    name: string
    description: string
    content: string[]
}

export type SkillsContentType = {
    skillName: string
    skills: string[]
}

export type SkillsSummaryType = {
    name: string
    description: string
    content: SkillsContentType[]
}

export type JobContentType = {
    company: string
    location?: string
    dates: string
    title: string
    info: string
    description: string[]
}

export type ProfessionalExperienceType = {
    name: string
    description: string
    content: JobContentType[]
}

export type EducationContentType = {
    institution: string
    location?: string
    degree: string
}

export type EducationType = {
    name: string
    description: string
    content: EducationContentType
}

export type SectionType = {
    name: string
    description: string
}

export default function Resume() {
    //To keep track of which sections are visible on the resume:
    const resume = React.useContext(ResumeContext)

    if (!resume) {
        return null;
    }
    const { visibleResumeSections, setVisibleResumeSections }: ResumeContextType = resume  

    const resumeSection = data.find(section => section.name === "personalInfo");
    if (!resumeSection) {
        throw new Error("personalInfo section not found in data");
    }

    let personalContent: PersonalDataContentType;
    if (Array.isArray(resumeSection.content)) {
        const first = resumeSection.content[0];
        if (
            first &&
            typeof first === "object" &&
            "name" in first &&
            "title" in first &&
            "phone" in first &&
            "email" in first
        ) {
            personalContent = first as PersonalDataContentType;
        } else {
            throw new Error("personalInfo content array does not contain valid PersonalDataContentType");
        }
    } else if (
        resumeSection.content &&
        typeof resumeSection.content === "object" &&
        "name" in resumeSection.content &&
        "title" in resumeSection.content &&
        "phone" in resumeSection.content &&
        "email" in resumeSection.content
    ) {
        personalContent = resumeSection.content as PersonalDataContentType;
    } else {
        throw new Error("personalInfo content is not a valid PersonalDataContentType");
    }

    const profile = data.find((section) => section.name === "professionalProfile")
    if (!profile) {
        throw new Error("professionalProfile section not found in data");
    }
    const profileTyped = profile as ProfessionalProfileType

    const skills = data.find((section) => section.name === "skillsSummary")
    if (!skills) {
        throw new Error("skillsSummary section not found in data");
    }
    const skillsTyped = skills as SkillsSummaryType

    const experience = data.find((section) => section.name === "professionalExperience") as ProfessionalExperienceType | undefined;
    if (!experience) {
        throw new Error("professionalExperience section not found in data");
    }
    const experienceContent = experience.content.map((job: JobContentType, index: number) => (
        <Job key={index} content={job} showhr={experience.content.length - 1 !== index} />
    ));

    const education = data.find((section) => section.name === "education")
    if (!education) {
        throw new Error("education section not found in data");
    }
    const educationContentTyped: EducationContentType = education.content as EducationContentType

    function checkBoxClick() {
        const form = document.forms.namedItem("resumeForm") as HTMLFormElement | null;
        if (!form) {
            console.warn("Form not found");
            return;
        }
        const formData = new FormData(form);
        const checked: FormDataEntryValue[] = formData.getAll("chkSection");

        if (checked.length == 0) {
            setVisibleResumeSections("none")          
        }
        else {
            if (checked.length == data.length - 1) {
                setVisibleResumeSections("all")
            }
            else { 
                setVisibleResumeSections(checked)
            }
        }
    }

    return (
        <form name="resumeForm" method="post" action="/resume">
            <div className="resume-container">
                <section className="section-heading">
                    <h1>{personalContent.name}</h1>
                    <h2>{personalContent.title}</h2>
                    <div className="heading-contact-info">
                        <span>{personalContent.phone}</span>
                        <span>{personalContent.email}</span>
                    </div>
                    <hr />
                    <div>
                        <fieldset>
                            <legend>Show / Hide Sections</legend>
                            {data.slice(1).map((section:SectionType) => (
                                <label key={section.name}>
                                    <input
                                        type="checkbox"
                                        name="chkSection"
                                        value={section.name}
                                        onClick={checkBoxClick}
                                        checked={visibleResumeSections === "all" || visibleResumeSections.includes(section.name)}
                                        readOnly
                                    />
                                    {section.description}
                                </label>
                            ))}
                        </fieldset>
                    </div>
                    <hr />
                </section>

                {(visibleResumeSections === "all" || visibleResumeSections.includes(profileTyped.name)) && (
                    <BasicSection name={profileTyped.name} description={profileTyped.description} content={profileTyped.content} />
                )}

                {(visibleResumeSections === "all" || visibleResumeSections.includes(skillsTyped.name)) && (
                    <BasicSection name={skillsTyped.name} description={skillsTyped.description} content={skillsTyped.content} />
                )}

                {(visibleResumeSections === "all" || visibleResumeSections.includes(experience.name)) && (
                    <div className="basic-section">
                        <h2>{experience.description}</h2>
                        {experienceContent}
                    </div>
                )}

                {(visibleResumeSections === "all" || visibleResumeSections.includes(education.name)) && (
                    <div className="basic-section">
                        <h2>{education.description}</h2>
                        <div>
                            <span>{educationContentTyped.institution}</span>
                            <span>{educationContentTyped.location}</span>
                        </div>
                        <p>{educationContentTyped.degree}</p>
                    </div>
                )}  

                <div className="basic-section">
                    <a
                        href={pdf_resume}
                        download="Vlad_Olfir_Resume.pdf"
                        className="link-button"
                    >
                        Download My Resume (PDF)
                    </a>
                </div>
            </div>
        </form>
    )
}