import styles from './Graph.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
    },
  };

    const Graph = ({preprocessedCandidates}) => {

        const isThisWeek = (date) => {
            const now = new Date();
            const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6); // Sunday
    
            return date >= firstDayOfWeek && date <= lastDayOfWeek;
        }

        const getDayOfWeek = (dateStr) => {
            const date = new Date(dateStr);
            const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            return days[date.getDay()];
        };
    

    console.log('preprocessed data in graphs:', preprocessedCandidates);

    // function getDayOfWeek(dateStr) {
    //     const date = new Date(dateStr);
    //     return date.getDay();
    // }

    const dayOfWeekCount = {
        'Sun': 0,
        'Mon': 0,
        'Tues': 0,
        'Wed': 0,
        'Thurs': 0,
        'Fri': 0,
        'Sat': 0
    };

    preprocessedCandidates?.forEach(candidate => {
        const candidateDate = new Date(candidate.date);
        if (isThisWeek(candidateDate)) {
            const dayOfWeek = getDayOfWeek(candidate.date);
            dayOfWeekCount[dayOfWeek]++;
        }
    });

    // const monday =  preprocessedCandidates.forEach(candidate => {
    //     const dayOfWeek = getDayOfWeek(candidate.date);
    //     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     dayOfWeekCount[days[dayOfWeek]]++;
    // });

    
    // console.log("candidates no acc to week day:",monday);
    
    const data = {
        labels: Object.keys(dayOfWeekCount),
        datasets: [
            {
                labels: 'Number of Applications',
                data: Object.values(dayOfWeekCount),
                backgroundColor: [
                    '#6E62E5',
                    '#D3CFFC',
                    '#6E62E5',
                    '#D3CFFC',
                    '#6E62E5',
                    '#D3CFFC',
                    '#6E62E5'
                ],
                borderColor: [
                    '#6E62E5',
                    '#D3CFFC',
                    '#6E62E5',
                    '#D3CFFC',
                    '#6E62E5',
                    '#D3CFFC',
                    '#6E62E5'
                ],
                borderWidth: 1,
            }
        ]
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.headingContainer}>
                        <h3 id={styles.unique}>
                            Applied Candidates
                        </h3>
                        <span>Last 5 days</span>
                    </div>

                    <div className={styles.graphContainer}>
                        <Bar className={styles.graph} options={options} data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Graph;