import AdminCandRep from './AdminCandRep';
import styles from './Body.module.css';
import CandidateReports from './CandidateReports';
import ClientList from './ClientsList';
import Jobs from './Jobs';

const AdminBody = () => {

    const dummyData = [

        {
            designation: 'Software Engineer',
            noOfAppliedCand: 25,
            techStack: [
                {
                    skill: 'Django',
                    img: '/django.svg'
                },
                {
                    skill: 'C++',
                    img: '/c++.svg'
                },
                {
                    skill: 'Python',
                    img: '/Python.svg'
                },
                {
                    skill: 'AWS',
                    img: '/aws.svg'
                },
            ],
            location: 'Karachi, Pakistan',
            status: 'Active'
        },
        {
            designation: 'Software Engineer',
            noOfAppliedCand: 25,
            techStack: [
                {
                    skill: 'Django',
                    img: '/django.svg'
                },
                {
                    skill: 'C++',
                    img: '/c++.svg'
                },
                {
                    skill: 'Python',
                    img: '/Python.svg'
                },
                {
                    skill: 'AWS',
                    img: '/aws.svg'
                },
            ],
            location: 'Karachi, Pakistan',
            status: 'Active'
        },
    ]

    return (
        <>
            <div className={styles.body}>
                <ClientList />
                <AdminCandRep />
            </div>
        </>
    )
}

export default AdminBody;