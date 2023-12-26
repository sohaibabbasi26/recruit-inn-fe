import styles from './AddSkillForm.module.css';
import Image from 'next/image';

const AddSkillForm = () => {

    const iconSize = 25;

    return (
        <>
            <form className={styles.addSkillFormContainer}>
                <div className={styles.inputField}>

                    <div className={styles.wrapper}>        
                        <Image className={styles.img} src='/award.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder='Add Required Skill' />
                    </div>

                    <select placeholder='Choose level of difficulty'>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/award.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder='Add Required Skill' />
                    </div>

                    <select placeholder='Choose level of difficulty'>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/award.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder='Add Required Skill' />
                    </div>

                    <select placeholder='Choose level of difficulty'>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div className={styles.inputField}>
                    <div className={styles.wrapper}>
                        <Image className={styles.img} src='/award.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder='Add Required Skill' />
                    </div>

                    <select placeholder='Choose level of difficulty'>
                        <option value="beginner">Beginnner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>
            </form>
        </>
    )
}

export default AddSkillForm;