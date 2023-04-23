import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import styles from '../../css/modules/campaign.module.css';
import sweetAlert from '../components/alert';
import Layout from '../components/layout';
import { campaignData, videoExtensions } from '../config';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from '../components/axios';

const Campaign = ({ genID }) => {
    const [campaignID, setCampaignID] = useState(null);
    const [type, setType] = useState('meeting');
    const [datetime, setDateTime] = useState(null);
    const [uploadInfo, setUploadInfo] = useState({
        loaded: null,
        total: null,
        percent: null,
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 'meeting') {
            if (!campaignID)
                return sweetAlert({ icon: 'error', title: 'Enter a campaign ID' });
            return router.get(`/campaign/${campaignID}`);
        } else {
            const data = {
                campaign_id: genID,
                scheduled_on: datetime,
            }
            const res = await axios.post('/campaign/create', data);
            sweetAlert({ icon: 'success', title: res.data.message });
            return router.get('/campaign');
        }
    }

    useEffect(() => {
        uploadMessage();
    }, [uploadInfo.loaded])

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = ((loaded * 100) / total).toFixed(1);
        if (percent <= 100) {
            setUploadInfo({
                ...uploadInfo,
                loaded,
                total,
                percent,
            });
        }
    };

    const handleVideo = async (e) => {
        const video = e.target.files[0];
        const ext = `.${video.name.split('.').pop()}`;
        if (!videoExtensions.includes(ext)) {
            return sweetAlert({ icon: 'error', title: 'Please upload a video.' });
        }
        const formData = new FormData();
        formData.append('video', video);

        if (video.size > 524288000) {
            return sweetAlert({ icon: 'error', title: 'Max video size is 500MB' });
        }

        const res = await axios.post('/campaign/video/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
        sweetAlert({ icon: 'success', title: res.data.message });
    }

    const uploadMessage = () => {
        let pow = null;
        let unit = null;
        if (uploadInfo.total / Math.pow(1024, 1) < 999) {
            pow = 1;
            unit = 'KB';
        } else if (uploadInfo.total / Math.pow(1024, 2) < 999) {
            pow = 2;
            unit = 'MB';
        } else {
            pow = 3;
            unit = 'GB';
        }

        const newLoaded = uploadInfo.loaded / Math.pow(1024, pow);
        const newTotal = uploadInfo.total / Math.pow(1024, pow);

        const message = `${newLoaded.toFixed(1)}${unit} / ${newTotal.toFixed(1)}${unit}`;
        setUploadInfo({ ...uploadInfo, message });
    }

    return (
        <Layout>
            <div className="section-title">
                <h1>campaign</h1>
            </div>

            <div className="row">
                <div className="col-md-8 col-lg-6">
                    <div className="mb-3">
                        <select
                            onChange={(e) => setType(e.target.value)}
                            className={`form-control ${styles.formControl}`}
                            value={type}
                        >
                            {campaignData.map((item, k) => (
                                <option value={item.type} key={k}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {type === 'meeting' && (
                            <div className="mb-3">
                                <input
                                    type="text"
                                    onChange={(e) => setCampaignID(e.target.value)}
                                    placeholder="Campaign ID"
                                    className={`form-control ${styles.formControl}`}
                                />
                            </div>
                        )}
                        {type === 'campaign' && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Campaign ID</label>
                                    <input
                                        type="text"
                                        // onChange={(e) => setCampaignID(e.target.value)}
                                        placeholder="Campaign ID"
                                        value={genID}
                                        className={`form-control ${styles.formControl}`}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Schedule date</label>
                                    <DateTimePicker
                                        autoFocus={true}
                                        onChange={setDateTime}
                                        value={datetime}
                                        format="dd/MM/y h:mm:ss a"
                                        dayPlaceholder='dd'
                                        monthPlaceholder='mm'
                                        yearPlaceholder='yy'
                                        hourPlaceholder='h'
                                        minutePlaceholder='m'
                                        secondPlaceholder='s'
                                        minDate={new Date()}
                                        className={styles.datetime}
                                        calendarClassName={styles.datetime2}
                                        clockClassName={styles.datetime2}
                                    />
                                </div>
                            </>
                        )}
                        {['meeting', 'campaign'].includes(type) && (
                            <button
                                type="submit"
                                className={`btn d-flex align-items-center 
                 justify-content-center text-capitalize ${styles.loginBtn}`}
                            >
                                {type === 'meeting' ? 'Join Now' : 'Create'}
                            </button>
                        )}
                    </form>

                    {type === 'video' && (
                        <>
                            <button
                                className={`btn d-flex align-items-center 
              justify-content-center text-capitalize ${styles.loginBtn}`}
                                onClick={() => document.getElementById('video-input').click()}
                            >
                                Upload Video
                            </button>
                            <input
                                type="file"
                                id="video-input"
                                accept={videoExtensions.join(',')}
                                onChange={handleVideo}
                                hidden
                            />
                            {uploadInfo.loaded && (
                                <div className="mt-3">
                                    <div className="progress">
                                        <div className="progress-bar bg-success progress-bar-striped"
                                            role="progressbar"
                                            style={{ width: `${uploadInfo.percent}%` }}
                                            aria-valuenow="10"
                                            aria-valuemin="0"
                                            aria-valuemax="100">{uploadInfo.percent}%</div>
                                    </div>
                                    <div className="mt-1 text-center text-main fw-bold">
                                        {uploadInfo.message}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Campaign