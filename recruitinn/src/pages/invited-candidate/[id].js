import InvitationOverlay from '../../../components/InvitationOverlay';
import Overlay from '../../../components/Overlay';
import styles from './invited-candidate.module.css';

const invitedCandidate = () => {
    const stages = {
        JOB_DETAIL: 'JOB_DETAIL',
        PERSONAL_INFO: 'PERSONAL_INFO',
        REQUIRED_SKILLS: 'REQUIRED_SKILLS'
    }

    const stageHeadings = {
        JOB_DETAIL: 'Youve been invited for the interview',
        PERSONAL_INFO: 'Hello there, tell us about yourself',
        REQUIRED_SKILLS: 'Technologies you will be asked for',
    };

    const showOverlay = true;
    return (
        <>
            <InvitationOverlay showOverlay={showOverlay} stages={stages} stageHeadings={stageHeadings} />
        </>
    );
}

export default invitedCandidate;