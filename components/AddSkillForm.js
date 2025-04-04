import { useFormContext } from '@/contexts/FormContext';
import styles from './AddSkillForm.module.css';
import Image from 'next/image';
import { forwardRef, useState, useEffect } from 'react';
// useFormContext

const AddSkillForm = forwardRef(({ setTechStack }) => {

    const iconSize = 25;

    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [skill4, setSkill4] = useState('');

    const [level1, setLevel1] = useState('beginner');
    const [level2, setLevel2] = useState('beginner');
    const [level3, setLevel3] = useState('beginner');
    const [level4, setLevel4] = useState('beginner');


    useEffect(() => {
        const FormSubmissionHandler = (e) => {

            const skills = [
                { skill: skill1, level: level1 },
                { skill: skill2, level: level2 },
                { skill: skill3, level: level3 },
                { skill: skill4, level: level4 },
            ];

            const filledSkills = skills.filter(skillObj => skillObj.skill);
            setTechStack(filledSkills);
        }

        FormSubmissionHandler();
    },[skill1,skill2,skill3,skill4,level1,level2,level3,level4]);


    return (
        <>
            <form className={styles.addSkillFormContainer}>
                <div className={styles.inputField}>

                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/Award.svg' width={iconSize} height={iconSize} />
                        <input type='text' value={skill1} placeholder='Add Required Skill' onChange={(e) => setSkill1(e.target.value)} />
                    </div>

                    <select placeholder='Choose level of difficulty' value={level1} onChange={(e) => setLevel1(e.target.value)}>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/Award.svg' width={iconSize} height={iconSize} />
                        <input type='text' value={skill2} placeholder='Add Required Skill' onChange={(e) => setSkill2(e.target.value)} />
                    </div>

                    <select placeholder='Choose level of difficulty' value={level2} onChange={(e) => setLevel2(e.target.value)}>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/Award.svg' width={iconSize} height={iconSize} />
                        <input type='text' value={skill3} placeholder='Add Required Skill' onChange={(e) => setSkill3(e.target.value)} />
                    </div>

                    <select placeholder='Choose level of difficulty' value={level3} onChange={(e) => setLevel3(e.target.value)}>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/Award.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder='Add Required Skill' value={skill4} onChange={(e) => setSkill4(e.target.value)} />
                    </div>

                    <select placeholder='Choose level of difficulty' value={level4} onChange={(e) => setLevel4(e.target.value)}>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>
            </form>
        </>
    )
});

export default AddSkillForm;